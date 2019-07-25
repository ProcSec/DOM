import DOMController from "@DOMPath/DOM/Helpers/domController"
import FieldsContainer from "@Core/Tools/validation/fieldsContainer"
import FieldChecker from "@Core/Tools/validation/fieldChecker"

export default (() => {
    const unique = "onClearSet"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting OnClear listeners")
        return data.element
    }

    const handler = (data) => {
        if (!Array.isArray(data.value)) data.value = [data.value]
        new FieldsContainer(["array",
            new FieldChecker({ type: "function" }),
        ]).set(data.value)

        data.value.forEach((co) => {
            data.event.on("clear", (...params) => {
                co(...params)
            })
        })
    }

    DOMController.registerProperty({
        name: "onClear",
        required: false,
        unique,
        handler,
        error,
    })
})()
