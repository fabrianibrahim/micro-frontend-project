import config from './config';
import download from './download';
import mountMicroFrontendInPage from './mount';

window.bootstrap = {};

function getMicroFrontendNameFromPathname(pathname = window.location.pathname) {
    const [, microFrontendId] = pathname.split('/');
    const microFrontend = config.microFrontends.find(microFrontend => microFrontend.pathnameId === microFrontendId);

    if (!microFrontend) {
        return;
    }

    return microFrontend.name;
}

function getMicroFrontendEntryPointUrl(microFrontendName) {
    return `/mfe/${microFrontendName}/index.html`
}

const microFrontendName = getMicroFrontendNameFromPathname();

if (!microFrontendName) {
    // TODO: load a "default" MFE
    throw new Error('I don\'t know which Micro Frontend to load for the current URL :(');
}


function unmountMicroFrontendFromPage(microFrontendName) {
    const microFrontendNodes = document.querySelectorAll(`[data-micro-frontend="${microFrontendName}"]`);
    microFrontendNodes.forEach(node => node.remove());
}

function updateBrowserUrl(pathname) {
    window.history.pushState({}, '', pathname);
}

function updateBaseElementHref(microFrontendName) {
    const baseElement = document.querySelector('base');
    baseElement.setAttribute('href', `/mfe/${microFrontendName}/`);
}

window.bootstrap.router = {
    navigateTo: function (pathname) {
        const microFrontendName = getMicroFrontendNameFromPathname(pathname);

        if (!microFrontendName) {
            // TODO: load a "default" MFE
            throw new Error(`I don't know which Micro Frontend to load for the pathname: ${pathname}`);
        }

        const microFrontendEntryPointUrl = getMicroFrontendEntryPointUrl(microFrontendName);

        download(microFrontendEntryPointUrl)
            .then(microFrontendDocument => {
                unmountMicroFrontendFromPage(microFrontendName);
                mountMicroFrontendInPage(microFrontendName, microFrontendDocument);
                updateBrowserUrl(pathname);
                updateBaseElementHref(microFrontendName);
            });
    }
};

