import DOMController from "@DOMPath/DOM/Helpers/domController"
import DOMObjectWrapper from "@DOMPath/DOM/Helpers/domObjectWrapper"

export default (() => {
    const unique = "genericElement"

    const error = () => {
        throw new Error("Incorrect node constructor parameter")
    }

    const handler = (data) => {
        if (data.shared.elementConstructorSkipped) return DOMObjectWrapper(data.element)

        if (typeof data.value !== "string") error()
        data.element = DOMObjectWrapper(data.element(data.value))

        return data.element
    }

    DOMController.registerProperty({
        name: "new",
        required: true,
        unique,
        handler,
        error,
    })
})()
