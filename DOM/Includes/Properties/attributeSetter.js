import DOMController from "@DOMPath/DOM/Helpers/domController"
import DOM from "@DOMPath/DOM/Classes/dom"

export default (() => {
    const unique = "attributeSetter"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Can't apply attributes")
    }

    const handler = (data) => {
        if (data.element.native.nodeType !== 1) {
            error()
            return data.element
        }

        if (!Array.isArray(data.value)) {
            if (typeof data.value === "object") {
                const repl = []

                Object.keys(data.value).forEach((i) => {
                    repl.push({
                        name: i.replace(/([A-Z])/g, "-$1").toLowerCase(),
                        value: data.value[i],
                    })
                })
                data.value = repl
            } else data.value = [data.value]
        }

        data.value.forEach((attr) => {
            if (attr instanceof DOM) {
                if (data.config.allowDeprecatedAttributeConstructor !== true
                    || attr.elementParse.native.nodeType !== 2) {
                    error()
                    return
                }

                attr = {
                    name: attr.elementParse.native.nodeName,
                    value: attr.elementParse.native.value,
                }
            }

            if (typeof attr.name !== "string") throw new TypeError(`Attribute name must be string, ${typeof attr.name} given`)
            if (!("value" in attr)) attr.value = ""
            attr.value = String(attr.value)

            data.element.native.setAttribute(attr.name, attr.value)
        })

        return data.element
    }

    DOMController.registerProperty({
        name: "attributes",
        required: false,
        unique,
        handler,
        error,
    })
})()
