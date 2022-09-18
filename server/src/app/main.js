// DEFINE THESE (OFTEN PER-TEAM) MODULES
const MODULES = {
    BggList: {
        tagName: 'bgg-list',
        className: 'BggList',
        scriptLocation: '.',
        fileName: 'listLib.js'
    },
    BggCart: {
        tagName: 'bgg-cart',
        className: 'BggCart',
        scriptLocation: '.',
        fileName: 'cartLib.js'
    }
};

let loadedModules = [];

// DEFINE THESE (OFTEN PER-TEAM) ROUTES:
// reminder: back-end routing needed?
const ROUTES = {
    '/': [MODULES.BggList, MODULES.BggCart],
    '/list': [MODULES.BggList]
};

// Load first route:
window.onload = function() {
    loadRoute(window.location.pathname);
};

function loadRoute (path) {
    // ** Only needed with hashtag # checking in URL, otherwise page is reloaded in this sample **
    // ** Unload all modules (for now). Otherwise save state somewhere  **
    // ** Also: unregistering is not yet possible in ECMAScript 2022). **
    for (let mod in loadedModules) {
        document.body.removeChild(loadedModules[mod]);
    }

    // Add the appropriate module(s):
    for (let mod in ROUTES[path]) {
        let current = ROUTES[path][mod];
        console.log('Loading module: ' + current.tagName);
        loadModule(current.tagName, current.className, current.scriptLocation, current.fileName);
    }
}

async function loadModule(tagName, cName, scriptLoc, fileName) {
    /* Adding the HTML, which can also be done by hand */
    if (tagName.indexOf('-') > -1) {

        const elem = document.createElement(tagName);
        document.body.appendChild(elem);
        loadedModules.push(elem);

        // Check if element has been added before
        if (window.customElements.get(tagName) === undefined) {
            const class2use = await import(`${scriptLoc}/${fileName}`);
            window.customElements.define(tagName, class2use.default);
        } else {
            throw new Error ('Element has been added before to the registry');
        }
    } else {
        throw new Error ('tagName has to contain a dash for future proofing HTML 5');
    }
}
