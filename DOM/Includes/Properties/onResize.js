import DOMController from "@DOMPath/DOM/Helpers/domController"

export default (() => {
    const unique = "onResize"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting ResizeObserver")
        return data.element
    }

    const handler = (data) => {
        data.value.forEach((e) => {
            if (typeof e !== "function") throw new TypeError(`Handlers must be  of type function, ${typeof e} given`)
        })

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
