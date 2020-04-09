import DomRegisteredProperty from "../Classes/domRegisteredProperty"
import DomRegisteredModule from "../Classes/domRegisteredModule"
import DOM from "../Classes/dom"

export default class DOMController {
    static #settings = {
        modules: [

        ],
        properties: [

        ],
        modificators: [

        ],
        config: {

        },
        errorsIgnore: false,
    }

    // #region Properties
    static registerProperty(property) {
        if (this.#settings.config.reportRegistration === true) this.log("New DOM property: ", property)

        if (typeof property.name !== "string" || !new RegExp("^[a-zA-Z0-9]+$").test(property.name)) throw new TypeError("Incorrect name")
        if (typeof property.unique !== "string" || !new RegExp("^[a-zA-Z0-9]+$").test(property.unique)) throw new TypeError("Incorrect unique")
        if (typeof property.required !== "boolean") throw new TypeError("Required must be boolean")
        if (typeof property.handler !== "function") throw new TypeError("Handler must be function")
        if (typeof property.error !== "function") throw new TypeError("Error must be function")

        let compMethod

        if (this.#settings.config.useFunctionsComparation) {
            compMethod = (v) => v.handler.toString() === property.handler.toString()
                && v.error.toString() === property.error.toString()
        } else {
            compMethod = (v) => v.unique === property.unique
        }

        const uncomp = this.#settings.properties.findIndex(compMethod)
        if (uncomp !== -1) throw new Error(`Property is already registered with ID ${uncomp}`)

        const id = this.#settings.properties.length
        this.#settings.properties.push(property)

        return new DomRegisteredProperty(id)
    }

    static getPropertyData(id) {
        if (!Number.isInteger(id)) throw new TypeError("ID must be integer")

        const g = this.#settings.properties[id]
        if (typeof g === "object") return g
        return false
    }

    static getProperties() {
        return this.#settings.properties
    }

    // #endregion

    // #region Modules
    static registerModule(module) {
        if (typeof module !== "object"
            || typeof module.onRender !== "function") throw new TypeError("Incorrect module")

        const id = this.#settings.modules.length
        this.#settings.modules.push()

        return new DomRegisteredModule(id)
    }

    static getModuleData(id) {
        if (!Number.isInteger(id)) throw new TypeError("ID must be integer")

        const g = this.#settings.modules[id]
        if (typeof g === "object") return g
        return false
    }

    static getModules() {
        return this.#settings.modules
    }

    // #endregion

    static get config() {
        return this.#settings.config
    }

    static setConfig(v) {
        if (typeof v !== "object") throw new TypeError("Config must be object")
        this.#settings.config = { ...this.#settings.config, ...v }
    }

    static errorIgnore(s) {
        const g = this.#settings.errorsIgnore
        const def = false
        s = s.toString()
        if (typeof g === "boolean") return g

        if (Array.isArray(g)) {
            const m = g.indexOf(s)
            if (m !== -1) return true
        }
        return def
    }

    static setErrorIgnore(n) {
        if (typeof n === "boolean") {
            this.#settings.errorsIgnore = n
            return true
        }
        if (!n.every((e) => typeof e === "string")) throw new TypeError("Every item must be string")
        this.#settings.errorsIgnore = n
        return true
    }

    static registerModificator({
        name, handler, get, set,
    }) {
        if (typeof name !== "string") throw new TypeError(`Modificator name must be string, ${typeof name} given`)
        if (!new RegExp("^[a-zA-Z]{3,20}$").test(name)) throw new TypeError("Incorrect Modificator name")


        if (this.#settings.modificators[name] !== undefined
            || name in DOM.prototype) throw new Error(`Method ${name} is already declared`)

        Object.defineProperty(DOM.prototype, name,
            {
                ...(handler ? { value: handler, writable: false } : {}),
                ...(get ? { get } : {}),
                ...(set ? { set } : {}),
            })

        this.#settings.modificators[name] = handler
    }

    static getModificator(name) {
        if (!(name in this.#settings.modificators) || typeof this.#settings.modificators[name] !== "function") {
            throw new Error("Incorrect modificator")
        }

        return this.#settings.modificators[name]
    }

    static getModificators() {
        return this.#settings.modificators
    }

    static log(...data) {
        const event = new CustomEvent("DOMController-Report", { detail: { type: "log", data } })
        window.dispatchEvent(event)
    }

    static error(...data) {
        const event = new CustomEvent("DOMController-Report", { detail: { type: "error", data } })
        window.dispatchEvent(event)
    }

    static warn(...data) {
        const event = new CustomEvent("DOMController-Report", { detail: { type: "warn", data } })
        window.dispatchEvent(event)
    }
}
