import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "scrollTo",
    handler(...object) {
        return this.elementParse.native.scrollTo(...object)
    },
})
