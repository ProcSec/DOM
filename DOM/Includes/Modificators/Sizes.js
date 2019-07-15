import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "sizes",
    get() {
        return this.elementParse.native.getBoundingClientRect()
    },
})
