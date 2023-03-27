function moveNodeToDocument(parent, document, markClass) {
    return function moveNode(node) {
        // Cloning or Adopting <scripts> nodes doesn't re-evaluate them
        // Read more here: https://stackoverflow.com/questions/28771542/why-dont-clonenode-script-tags-execute
        if (node.tagName === 'SCRIPT') {
            const clonedNode = document.createElement(node.tagName);

            [...node.attributes].forEach(attribute =>
                clonedNode.setAttribute(attribute.name, attribute.value)
            );
            clonedNode.innerHTML = node.innerHTML;

            parent.appendChild(clonedNode);
            return;
        }

        const adoptedNode = document.adoptNode(node);
        adoptedNode.classList.add(markClass); // add a specific class to the node
        parent.appendChild(adoptedNode);
    };
}


function addOrUpdateBaseTag(microFrontendName, href) {
    const baseElement = document.querySelector('base') || document.createElement('base'); // get the existing element or create a new one if it doesn't exist
    baseElement.setAttribute('href', href);
    document.head.appendChild(baseElement);
}


function mountMicroFrontendInPage(microFrontendName, microFrontendDocument) {
    addOrUpdateBaseTag(microFrontendName);

    const microFrontendHeadNodes = microFrontendDocument.querySelectorAll('head>*');
    const microFrontendBodyNodes = microFrontendDocument.querySelectorAll('body>*');

    microFrontendHeadNodes.forEach(moveNodeToDocument(document.head, document, 'MICRO_FRONTEND'));
    microFrontendBodyNodes.forEach(moveNodeToDocument(document.body, document, 'MICRO_FRONTEND'));
}


export default mountMicroFrontendInPage;
