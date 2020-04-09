import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "removeAttributes",
    handler(...a) {
        a.forEach((attr) => {
            if (typeof attr !== "string") throw new TypeError(`Attribute name must be string, ${typeof attr} received`)

            this.elementParse.native.removeAttribute(attr)
        })
    },
})
