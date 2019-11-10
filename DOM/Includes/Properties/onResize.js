import DOMController from "@DOMPath/DOM/Helpers/domController"
import FieldsContainer from "@Core/Tools/validation/fieldsContainer"
import FieldChecker from "@Core/Tools/validation/fieldChecker"

export default (() => {
    const unique = "onResize"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting ResizeObserver")
        return data.element
    }

    const handler = (data) => {
        new FieldsContainer(["array",
            new FieldChecker({ type: "function" }),
        ]).set(data.value)

        data.value.forEach((co) => {
            const mo = new ResizeObserver(co)

            let installed = false

            data.event.on("render", (c) => {
                if (installed) return
                installed = true
                mo.observe(data.element.native)
            })
        })
    }

    DOMController.registerProperty({
        name: "onResize",
        required: false,
        unique,
        handler,
        error,
    })
})()
