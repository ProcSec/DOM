import DOMController from "@DOMPath/DOM/Helpers/domController"
import camelCaseConverter from "@DOMPath/DOM/Helpers/lib/camelCaseConverter"

export default (() => {
    const unique = "styleApplicator"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Object doesn't support styles")
        return data.element
    }

    const handler = (data) => {
        if (!("style" in data.element.native)) error()

        Object.keys(data.value).forEach((e) => {
            try {
                const value = data.value[e].toString()
                const r = value.match(/^(.+) !important$/)
                data.element.native.style.setProperty(camelCaseConverter(e, "-", true), (r ? r[1] : value), (r ? "important" : ""))
            } catch (er) {
                // Ignore invalid styles
            }
        })

        return data.element
    }

    DOMController.registerProperty({
        name: "style",
        required: false,
        unique,
        handler,
        error,
    })
})()
