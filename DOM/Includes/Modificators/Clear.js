import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "clear",
    handler(...a) {
        this.elementParse.clear()
        this.render(...a)
    },
})
