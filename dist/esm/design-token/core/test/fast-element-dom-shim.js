// Allow fast-element to bootstrap. This is necessary
// because DesignTokenNode uses fast-element's Observable,
// and importing Observable forces access to several DOM globals
globalThis["document"] = {
    createElement() {
        return {};
    },
};
globalThis["HTMLElement"] = class {
};
export {};
