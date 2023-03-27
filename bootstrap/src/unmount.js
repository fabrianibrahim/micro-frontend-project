function unmountMicroFrontend(markClass) {
    const microFrontendElements = document.querySelectorAll(`.${markClass}`);

    microFrontendElements.forEach(element => {
        if (element.parentElement) {
            element.parentElement.removeChild(element);
        }
    })
}

export default unmountMicroFrontend;