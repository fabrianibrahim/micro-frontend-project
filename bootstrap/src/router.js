import config from "./config";
import { xhrDocument } from "./xhr";
import { mountMicroFrontendInPage, unmountMicroFrontendInPage } from "./mount";
import { dispatchEvent, eventNames } from "./events";
import { isUserLoggedIn } from "./auth";

const {
    MICRO_FRONTEND_WILL_UNMOUNT,
    MICRO_FRONTEND_DID_UNMOUNT,
    MICRO_FRONTEND_WILL_MOUNT,
    MICRO_FRONTEND_DID_MOUNT,
} = eventNames;

function getMicroFrontendFromPathname(pathname) {
    const [, microFrontendId] = pathname.split("/");
    const microFrontend = config.microFrontends.find(
        microFrontend => microFrontend.pathnameId === microFrontendId
    );

    if (!microFrontend) {
        return;
    }

    return microFrontend;
}

function getMicroFrontendEntryPointUrl(microFrontendName) {
    return `/mfe/${microFrontendName}/index.html`;
}

const navigationHistory = [];

function navigateTo(pathname) {
    const microFrontend = getMicroFrontendFromPathname(pathname);

    if (!microFrontend) {
        console.log(`Dunno which Micro Frontend to load for "${pathname}". I'm redirecting you to "${config.defaultPathname}"`);
        return navigateTo(config.defaultPathname);
    }

    if (!isUserLoggedIn && microFrontend.restricted) {
        console.log(`You\'re not athorized to access this Micro Frontend. I\'m redirecting you to "${config.defaultPathname}"`);
        return navigateTo(config.defaultPathname);
    }

    if (isUserLoggedIn && !microFrontend.restricted) {
        console.log(`Since you're logged in, I'm redirecting you to the "music" micro frontend at "${config.defaultPathnameWhenLoggedIn}"`);
        return navigateTo(config.defaultPathnameWhenLoggedIn);
    }

    const microFrontendName = microFrontend.name;

    if (navigationHistory.length > 0) {
        const { name: currentMicroFrontend } = getMicroFrontendFromPathname(
            navigationHistory[navigationHistory.length - 1]
        );

        dispatchEvent(MICRO_FRONTEND_WILL_UNMOUNT, { microFrontendName: currentMicroFrontend });
        unmountMicroFrontendInPage();
        dispatchEvent(MICRO_FRONTEND_DID_UNMOUNT, { microFrontendName: currentMicroFrontend });
    }

    dispatchEvent(MICRO_FRONTEND_WILL_MOUNT, { microFrontendName });

    navigationHistory.push(pathname);
    window.history.pushState({}, "", pathname);

    const microFrontendEntryPointUrl = getMicroFrontendEntryPointUrl(
        microFrontendName
    );

    return xhrDocument({ url: microFrontendEntryPointUrl })
        .then(microFrontendDocument =>
            mountMicroFrontendInPage(microFrontendName, microFrontendDocument)
        )
        .then(() => {
            dispatchEvent(MICRO_FRONTEND_DID_MOUNT, { microFrontendName });
        });
}

export { navigateTo };
