import DOMController from "@DOMPath/DOM/Helpers/domController"
import DOM from "@DOMPath/DOM/Classes/dom"

export default (() => {
    const unique = "appendContent"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error(`Content of type ${typeof data.value} and not DOM instance is unapplicapable to this nodeType: ${data.element.get("nodeType")}`)
        return data.element
    }

    function handler(data) {
        const self = this
        if (data.element.get("nodeType") !== 1) error()

        if (!Array.isArray(data.value)) data.value = [data.value]

        data.shared.contentNodesCallback = []

        data.value.forEach((item) => {
            if (typeof item === "string" && DOMController.config.contentStringAsTextNode === true) {
                item = new DOM({
                    type: "text",
                    new: item,
                })
            }

            if (!(item instanceof DOM)) {
                if (DOMController.errorIgnore(unique)) return
                throw new Error("Can't apply not DOM-class object")
            }
            item.parent = self
            self.content.add(item)
            data.element.render(item)
        })

        return data.element
    }

    DOMController.registerProperty({
        name: "content",
        required: false,
        unique,
        handler,
        error,
    })
})()
