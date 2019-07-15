import DOMController from "@DOMPath/DOM/Helpers/domController"
import FieldsContainer from "@Core/Tools/validation/fieldsContainer"
import FieldChecker from "@Core/Tools/validation/fieldChecker"

export default (() => {
    const unique = "mutationListener"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting MutationObserver")
        return data.element
    }

    const handler = (data) => {
        new FieldsContainer(["array",
            new FieldsContainer([
                ["handler"],
                {
                    config: new FieldChecker({ type: "object" }),
                    handler: new FieldChecker({ type: "function" }),
                },
            ]),
        ]).set(data.value)

        data.value.forEach((co) => {
            const mo = new MutationObserver(co.handler)

            let installed = false

            data.event.on("render", (c) => {
                if (installed) return
                installed = true
                mo.observe(data.element.native, co.config)
            })
        })
    }

    DOMController.registerProperty({
        name: "mutations",
        required: false,
        unique,
        handler,
        error,
    })
})()
