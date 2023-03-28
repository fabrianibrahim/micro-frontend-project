import config from "./config";
import download from "./download";
import { mountMicroFrontendInPage, unmountMicroFrontendInPage } from "./mount";
import { dispatchEvent, eventNames } from "./events";

const defaultPathname = '/hello';
const defaultPathnameWhenLoggedIn = '/play';

let isUserLoggedIn = false;

function validateToken() {
    const token = getToken();
    if (!token) {
        return Promise.resolve(false);
    }

    return xhrJson({
        url: 'https://buildingmfe.maxgallo.io/api/validate',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(() => isUserLoggedIn = true)
        .catch(() => isUserLoggedIn = false)
}

function getMicroFrontendNameFromPathname(pathname) {
    const [, microFrontendId] = pathname.split("/");
    const microFrontend = config.microFrontends.find(
        microFrontend => microFrontend.pathnameId === microFrontendId
    );

    if (!microFrontend) {
        return;
    }

    return microFrontend.name;
}

function getMicroFrontendEntryPointUrl(microFrontendName) {
    return `/mfe/${microFrontendName}/index.html`;
}

const navigationHistory = [];

function navigateTo(pathname) {
    const microFrontendName = getMicroFrontendNameFromPathname(pathname);

    if (!microFrontend) {
        console.log(`Dunno which micro frontend to load for "${pathname}". I'm redirecting you to "${defaultPathname}"`);
        return navigateTo(defaultPathname);
    }

    if (!isUserLoggedIn && microFrontend.restricted) {
        console.log(`You\'re not athorized to access this micro frontend. I\'m redirecting you to "${defaultPathname}"`);
        return navigateTo(defaultPathname);
    }

    if (isUserLoggedIn && !microFrontend.restricted) {
        console.log(`Since you're logged in, I'm redirecting you to the "music" micro frontend at "${defaultPathnameWhenLoggedIn}"`);
        return navigateTo(defaultPathnameWhenLoggedIn);
    }

    if (navigationHistory.length > 0) {
        const currentMicroFrontend = getMicroFrontendNameFromPathname(
            navigationHistory[navigationHistory.length - 1]
        );
        dispatchEvent(eventNames.MICRO_FRONTEND_WILL_UNMOUNT, {
            microFrontendName: currentMicroFrontend
        });
        unmountMicroFrontendInPage();
        dispatchEvent(eventNames.MICRO_FRONTEND_DID_UNMOUNT, {
            microFrontendName: currentMicroFrontend
        });
    }

    dispatchEvent(eventNames.MICRO_FRONTEND_WILL_MOUNT, { microFrontendName });
    navigationHistory.push(pathname);
    window.history.pushState({}, "", pathname);

    const microFrontendEntryPointUrl = getMicroFrontendEntryPointUrl(
        microFrontendName
    );

    return download(microFrontendEntryPointUrl)
        .then(microFrontendDocument =>
            mountMicroFrontendInPage(microFrontendName, microFrontendDocument)
        )
        .then(() => {
            dispatchEvent(eventNames.MICRO_FRONTEND_DID_MOUNT, {
                microFrontendName
            });
        });
}

export { navigateTo };
