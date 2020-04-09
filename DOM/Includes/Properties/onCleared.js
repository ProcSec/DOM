import DOMController from "@DOMPath/DOM/Helpers/domController"

export default (() => {
    const unique = "onClearedSet"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting OnCleared listeners")
        return data.element
    }

    const handler = (data) => {
        if (!Array.isArray(data.value)) data.value = [data.value]
        data.value.forEach((e) => {
            if (typeof e !== "function") throw new TypeError(`Handlers must be  of type function, ${typeof e} given`)
        })

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
