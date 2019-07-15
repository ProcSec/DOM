import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "contains",
    handler(element, native = false) {
        const el = this.elementParse.native

        return !!(el.contains((native ? element : element.elementParse.native)))
    },
})
