import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "setAttributes",
    handler(...a) {
        a.forEach(({ name, value }) => {
            if (typeof name !== "string") throw new TypeError(`Attribute name must be string, ${typeof name} received`)

            this.elementParse.native.setAttribute(name, value)
        })
    },
})
