function xhrWithResponseType(responseType) {
    return function xhr({
        url,
        method = 'GET',
        headers = {},
        timeoutMs = 5000
    }) {
        const request = new XMLHttpRequest();
        request.timeout = timeoutMs;
        request.responseType = responseType;

        return new Promise((resolve, reject) => {
            request.onerror = () => reject(new Error(`An error occurred while downloading ${url}`));
            request.ontimeout = () => reject(new Error(`The following request did timeout: ${url}`));

            request.onload = () => {
                if (request.status >= 400) {
                    reject(new Error(`Received HTTP Status ${request.status} for ${url}`));
                }
                resolve(request.response);
            };

            request.open(method, url);

            const headersToAdd = Object.entries(headers);
            if (headersToAdd.length > 0) {
                headersToAdd.forEach(([headerName, headerValue]) => {
                    request.setRequestHeader(headerName, headerValue);
                });
            }

            request.send();
        });
    };
}

const xhrDocument = xhrWithResponseType('document');
const xhrJson = xhrWithResponseType('json');

export { xhrDocument, xhrJson };
