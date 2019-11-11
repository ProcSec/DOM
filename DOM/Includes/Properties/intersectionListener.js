import DOMController from "@DOMPath/DOM/Helpers/domController"
import FieldsContainer from "@Core/Tools/validation/fieldsContainer"
import FieldChecker from "@Core/Tools/validation/fieldChecker"

export default (() => {
    const unique = "intersectionListener"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting IntersectionObserver")
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
            const mo = new IntersectionObserver(co.handler, co.config)

            let installed = false

            data.event.on("render", (c) => {
                if (installed) return
                installed = true
                mo.observe(data.element.native)
            })
        })
    }

    DOMController.registerProperty({
        name: "intersections",
        required: false,
        unique,
        handler,
        error,
    })
})()
