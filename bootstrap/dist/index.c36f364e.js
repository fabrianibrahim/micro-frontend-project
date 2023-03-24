const loadMicroFrontend = async ()=>{
    console.log("Loading micro-frontend");
    // Decide which micro frontend to load based on the URL
    const pathname = window.location.pathname;
    let microFrontend = "";
    switch(pathname){
        case "/hello":
            microFrontend = "welcome";
            break;
        case "/play":
            microFrontend = "music";
            break;
        default:
            throw new Error("Micro frontend not found");
    }
    // Download the selected micro frontend using the index.html entry point
    const response = await fetch(`/mfe/${microFrontend}/index.html`);
    const html = await response.text();
    // Parse the content of index.html using the DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // Transfer all the nodes in <head> and <body> from the downloaded document to the page Document
    const headNodes = doc.getElementsByTagName("head")[0].childNodes;
    const bodyNodes = doc.getElementsByTagName("body")[0].childNodes;
    for(let i = 0; i < headNodes.length; i++)document.head.appendChild(document.importNode(headNodes[i], true));
    for(let i = 0; i < bodyNodes.length; i++){
        const node = document.importNode(bodyNodes[i], true);
        if (node.nodeName === "SCRIPT") {
            // Fix script nodes by copying the content of the script into a new script element
            const newScriptNode = document.createElement("script");
            newScriptNode.innerHTML = node.innerHTML;
            node.parentNode.replaceChild(newScriptNode, node);
        } else if (node.nodeName === "LINK" && node.rel === "stylesheet") {
            // Fix link nodes by copying the href attribute to the new node
            const newLinkNode = document.createElement("link");
            newLinkNode.setAttribute("rel", "stylesheet");
            newLinkNode.setAttribute("href", node.getAttribute("href"));
            node.parentNode.replaceChild(newLinkNode, node);
        } else if (node.nodeName === "IMG") {
            // Fix img nodes by copying the src attribute to the new node
            const newImgNode = document.createElement("img");
            newImgNode.setAttribute("src", node.getAttribute("src"));
            node.parentNode.replaceChild(newImgNode, node);
        }
        document.body.appendChild(node);
    }
    // Add base tag to fix relative URLs in micro frontend assets
    addBaseTag(microFrontend);
};
function addBaseTag(microFrontendName) {
    const baseElement = document.createElement("base");
    baseElement.setAttribute("href", `/mfe/${microFrontendName}/`);
    document.head.appendChild(baseElement);
}
loadMicroFrontend();

//# sourceMappingURL=index.c36f364e.js.map
