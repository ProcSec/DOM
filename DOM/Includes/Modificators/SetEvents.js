import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "setEvents",
    handler(w) {
        const single = !Array.isArray(w)
        if (!Array.isArray(w)) w = [w]

        w.forEach((e) => {
            if (typeof e !== "object") throw new TypeError(`Event must be object, ${typeof e} given`)
            if (typeof e.event !== "string") throw new TypeError("Event name (.event) must be string")
            if (typeof e.handler !== "function") throw new TypeError("Event handler must be function")
            if ("params" in e && typeof e.params !== "object") throw new TypeError("Event params must be object")
        })

        const result = w.map((e) => {
            try {
                const self = this
                const eventSetParams = [
                    e.event,
                    // eslint-disable-next-line prefer-arrow-callback, func-names
                    function (...ep) {
                        return e.handler.bind(this)(...ep, self)
                    }, (e.params ? e.params : {}),
                ]

                if (DOMController.config.eventsOnClickAutoTabIndex === true
                    && ["click"]
                        .includes(e.event)) {
                    this.elementParse.native.tabIndex = 0
                }

                this.elementParse.native.addEventListener(...eventSetParams)

                return {
                    destroy: () => this.elementParse.native.removeEventListener(...eventSetParams),
                    info: eventSetParams,
                }
            } catch (e2) {
                throw new Error("Failed to set a property")
            }
        })

        return (single ? result[0] : result)
    },
})
