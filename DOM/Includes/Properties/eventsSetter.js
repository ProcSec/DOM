import DOMController from "@DOMPath/DOM/Helpers/domController"

export default (() => {
    const unique = "eventsSetter"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Events set failed")
    }

    function handler(data) {
        if (typeof data.value !== "object") {
            if (!DOMController.errorIgnore(unique)) throw new Error("Events must be object")
            return
        }

        let w = data.value
        if (!Array.isArray(data.value)) w = [data.value]

        w.forEach((e) => {
            if (typeof e !== "object") throw new TypeError(`Event must be object, ${typeof e} given`)
            if (typeof e.event !== "string") throw new TypeError("Event name (.event) must be string")
            if (typeof e.handler !== "function") throw new TypeError("Event handler must be function")
            if ("params" in e && typeof e.params !== "object") throw new TypeError("Event params must be object")
        })

        w.forEach((e) => {
            try {
                const self = this

                data.element.native.addEventListener(e.event,
                    // eslint-disable-next-line prefer-arrow-callback, func-names
                    function (...ep) {
                        return e.handler.bind(this)(...ep, self)
                    }, (e.params ? e.params : {}))
                try {
                    if (data.config.eventsOnClickAutoTabIndex === true
                        && ["click"]
                            .includes(e.event)) {
                        data.element.native.tabIndex = 0
                    }
                } catch (e3) {
                    // This automation is not neccessary
                }
            } catch (e2) {
                if (!DOMController.errorIgnore(unique)) throw new Error("Failed to set a property")
            }
        })
    }

    DOMController.registerProperty({
        name: "events",
        required: false,
        handler,
        error,
        unique,
    })
})()
