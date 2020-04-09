import DOMController from "@DOMPath/DOM/Helpers/domController"

export default (() => {
    const unique = "onRenderedSet"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting OnRendered listeners")
        return data.element
    }

    const handler = (data) => {
        if (!Array.isArray(data.value)) data.value = [data.value]
        data.value.forEach((e) => {
            if (typeof e !== "function") throw new TypeError(`Handlers must be  of type function, ${typeof e} given`)
        })

        data.value.forEach((co) => {
            data.event.on("rendered", (...params) => {
                co(...params)
            })
        })
    }

    DOMController.registerProperty({
        name: "onRendered",
        required: false,
        unique,
        handler,
        error,
    })
})()
