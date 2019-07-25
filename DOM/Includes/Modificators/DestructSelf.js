import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "destructSelf",
    handler() {
        try {
            this.emitEvent("clear", { destructSelf: true })
            this.elementParse.native.parentElement.removeChild(this.elementParse.native)
            if (this.parent) this.parent.content.delete(this)
        } catch (e) {
            // Already destructed
        }
    },
})
