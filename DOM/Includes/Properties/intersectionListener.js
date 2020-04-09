import DOMController from "@DOMPath/DOM/Helpers/domController"

export default (() => {
    const unique = "intersectionListener"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Failed with setting IntersectionObserver")
        return data.element
    }

    const handler = (data) => {
        data.value.forEach((e) => {
            if (typeof e.handler !== "function") throw new TypeError(`Observer handler must be function, ${typeof e} given`)
            if ("config" in e && typeof e.config !== "object") throw new TypeError(`Observer config must be object, ${typeof e} given`)
        })

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
