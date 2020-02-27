import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "getAttribute",
    handler(a) {
        return this.elementParse.native.getAttribute(a)
    },
})
