import camelCaseConverter from "@Core/Tools/transformation/text/camelCaseConverter"
import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "style",
    handler(a) {
        if (typeof a !== "object") return
        Object.keys(a).forEach((e) => {
            const value = a[e].toString()
            const r = value.match(/^(.+) !important$/)
            this.elementParse.native.style.setProperty(camelCaseConverter(e, "-", true), (r ? r[1] : value), (r ? "important" : ""))
        })
    },
})
