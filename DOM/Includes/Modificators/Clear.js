import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "clear",
    handler(...a) {
        this.emitEvent("clear", {})
        this.elementParse.clear()
        this.emitEvent("cleared", {})
        this.render(...a)
        this.emitEvent("clear-rendered", {})
    },
})
