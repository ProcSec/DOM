import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "scrollIntoView",
    handler(...object) {
        return this.elementParse.native.scrollIntoView(...object)
    },
})
