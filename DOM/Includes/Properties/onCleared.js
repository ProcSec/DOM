import DOMController from "@DOMPath/DOM/Helpers/domController"
import FieldsContainer from "@Core/Tools/validation/fieldsContainer"
import FieldChecker from "@Core/Tools/validation/fieldChecker"

export default (() => {
    const unique = "onClearedSet"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting OnCleared listeners")
        return data.element
    }

    const handler = (data) => {
        if (!Array.isArray(data.value)) data.value = [data.value]
        new FieldsContainer(["array",
            new FieldChecker({ type: "function" }),
        ]).set(data.value)

        data.value.forEach((co) => {
            data.event.on("cleared", (...params) => {
                co(...params)
            })
        })
    }

    DOMController.registerProperty({
        name: "onCleared",
        required: false,
        unique,
        handler,
        error,
    })
})()
