import DOMController from "../Helpers/domController"

export default class DOM {
    elementParse = null

    object = Object.create(null)

    storage = Object.create(null)

    events = Object.create(null)

    parent = null

    content = new Set()

    constructor(object) {
        if (typeof object !== "object") throw new TypeError(`DOM accepts object as an argument, ${typeof object} given`)
        this.object = object

        this.onEvent("render", (c = {}) => (c.asContent ? this.moduleWorkerOnRender : () => { }))
        this.onEvent("render", () => {
            this.content.forEach((e) => {
                if (typeof e.emitEvent === "function") { e.emitEvent("render", { asContent: true }) }
            })
        })

        this.onEvent("clear", () => {
            this.content.forEach((e) => {
                if (typeof e.emitEvent === "function") { e.emitEvent("clear", { asContent: true }) }
            })
        })

        this.propertyWorker()
    }

    onEvent(event, handler) {
        if (typeof event !== "string" || event.length < 1) throw new TypeError(`Incorrect DOM Event name. ${typeof event}${typeof event === "string" ? `(${event.length})` : ""} given`)
        if (typeof handler !== "function") throw new TypeError(`DOM Event handler must be function. ${typeof handler} given`)

        if (!(event in this.events) || !Array.isArray(this.events[event])) this.events[event] = []

        this.events[event].push(handler.bind(this))
    }

    emitEvent(event, data = {}) {
        if (typeof event !== "string" || event.length < 1) throw new TypeError(`Incorrect DOM Event name. ${typeof event}${typeof event === "string" ? `(${event.length})` : ""} given`)
        if (typeof data !== "object") throw new TypeError(`DOM Event object must be of type object. ${typeof data} given`)


        if (!(event in this.events) || !Array.isArray(this.events[event])) return

        this.events[event].forEach((e) => {
            try {
                if (typeof e === "function") e(data, this)
            } catch (r) {
                // Ignore bad listeners
            }
        })
    }

    propertyWorker() {
        const o = this.object
        const prop = DOMController.getProperties()
        let el = this.elementParse
        const sharedStorage = this.storage

        prop.forEach((p) => {
            if (p.required || p.name in o) {
                let r
                const rewrite = (value) => {
                    o[p.name] = value
                }

                try {
                    r = p.handler.bind(this)({
                        element: el,
                        value: o[p.name],
                        all: o,
                        config: DOMController.config,
                        rewrite,
                        shared: sharedStorage,
                        event: {
                            on: this.onEvent.bind(this),
                            emit: this.emitEvent.bind(this),
                        },
                    })
                } catch (e) {
                    DOMController.error("DOM Property error", e)
                    r = p.error.bind(this)({
                        element: el,
                        value: o[p.name],
                        all: o,
                        config: DOMController.config,
                        rewrite,
                        shared: sharedStorage,
                        event: {
                            on: this.onEvent.bind(this),
                            emit: this.emitEvent.bind(this),
                        },
                        error: e,
                    })
                }

                if (r !== undefined) el = r
            }
        })

        this.object = o
        this.elementParse = el
        this.storage = sharedStorage
    }

    moduleWorkerOnRender() {
        const o = this.object
        const prop = DOMController.getModules()
        let el = this.elementParse
        const sharedStorage = this.storage

        prop.forEach((p) => {
            let r
            const rewrite = (value) => {
                o[p.name] = value
            }

            try {
                r = p.handler.bind(this)({
                    element: el,
                    value: o[p.name],
                    all: o,
                    config: DOMController.config,
                    rewrite,
                    shared: sharedStorage,
                })
            } catch (e) {
                // Sometimes modules may work wrong,
                // but it mustn't break the DOM object
            }

            if (r !== undefined) el = r
        })
        this.object = o
        this.elementParse = el
        this.storage = sharedStorage
    }

    static extract(el) {
        if (!(el instanceof DOM)) throw new TypeError("Not a DOM object passed")

        return el.elementParse
    }
}
