import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "scrollBy",
    handler(...object) {
        return this.elementParse.native.scrollBy(...object)
    },
})
