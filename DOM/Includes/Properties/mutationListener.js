import DOMController from "@DOMPath/DOM/Helpers/domController"

export default (() => {
    const unique = "mutationListener"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting MutationObserver")
        return data.element
    }

    const handler = (data) => {
        data.value.forEach((e) => {
            if (typeof e.handler !== "function") throw new TypeError(`Observer handler must be function, ${typeof e} given`)
            if ("config" in e && typeof e.config !== "object") throw new TypeError(`Observer config must be object, ${typeof e} given`)
        })

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
