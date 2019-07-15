import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "destructSelf",
    handler() {
        try {
            this.elementParse.native.parentElement.removeChild(this.elementParse.native)
        } catch (e) {
            // Already destructed
        }
    },
})
