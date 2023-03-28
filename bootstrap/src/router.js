import config from "./config";
import download from "./download";
import { mountMicroFrontendInPage, unmountMicroFrontendInPage } from "./mount";
import { dispatchEvent, eventNames } from "./events";

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

    if (!microFrontendName) {
        // TODO: load a "default" MFE
        throw new Error(
            `I don't know which Micro Frontend to load for "${pathname}"`
        );
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
