import DOM from "../Classes/dom"

const DOMObjectWrapper = (El) => {
    const methods = {
        render: {
            value: (e) => {
                if (!(e instanceof DOM)) throw new TypeError("Can't render not-DOM element, use native methods")
                e.emitEvent("render", {})
                El.appendChild(Object.getPrototypeOf(e.elementParse))
                e.emitEvent("rendered", {})
            },
            writable: false,
        },
        prepend: {
            value(e) {
                if (!(e instanceof DOM)) throw new TypeError("Can't render not-DOM element, use native methods")
                e.emitEvent("render", {})
                const ch = El.children[0]
                if (ch) {
                    this.insertBefore(e, ch)
                } else {
                    this.render(e)
                }
                e.emitEvent("rendered", {})
            },
            writable: false,
        },
        insertBefore: {
            value: (e, ch) => {
                if (!(e instanceof DOM)) throw new TypeError("Can't render not-DOM element, use native methods")
                e.emitEvent("render", {})
                El.before(Object.getPrototypeOf(e.elementParse))
                e.emitEvent("rendered", {})
            },
            writable: false,
        },
        insertAfter: {
            value: (e, ch) => {
                if (!(e instanceof DOM)) throw new TypeError("Can't render not-DOM element, use native methods")
                e.emitEvent("render", {})
                El.after(Object.getPrototypeOf(e.elementParse))
                e.emitEvent("rendered", {})
            },
            writable: false,
        },
        clear: {
            value: (e) => {
                El.innerHTML = ""
                if (e) methods.render.value(e)
            },
            writable: false,
        },
        native: {
            get() { return Object.getPrototypeOf(this) },
        },
    }

    const wrapper = Object.create(El, methods)

    return wrapper
}

export default DOMObjectWrapper
