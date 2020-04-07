import FieldsContainer from "../../../Tools/validation/fieldsContainer"
import FieldChecker from "../../../Tools/validation/fieldChecker"
import DomRegisteredProperty from "../Classes/domRegisteredProperty"
import DomRegisteredModule from "../Classes/domRegisteredModule"
import Report from "../../../Services/reportOld"
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
        if (this.#settings.config.reportRegistration === true) Report.write("New DOM property: ", property)
        new FieldsContainer([
            ["name", "required", "handler", "error", "unique"],
            {
                name: new FieldChecker({ type: "string", symbols: "a-zA-Z0-9" }),
                required: new FieldChecker({ type: "boolean" }),
                handler: new FieldChecker({ type: "function" }),
                error: new FieldChecker({ type: "function" }),
                unique: new FieldChecker({ type: "string", symbols: "a-zA-Z0-9" }),
            },
        ]).set(property)

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
        new FieldChecker({ isInt: true }).set(id)

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
        new FieldsContainer([
            ["onRender"],
            {
                onRender: new FieldChecker({ type: "function" }),
            },
        ]).set(module)

        const id = this.#settings.modules.length
        this.#settings.modules.push()

        return new DomRegisteredModule(id)
    }

    static getModuleData(id) {
        new FieldChecker({ isInt: true }).set(id)

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
        new FieldChecker({ type: "object" }).set(v)
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
        new FieldsContainer(["array", new FieldChecker({ type: "string" })]).set(n)
        this.#settings.errorsIgnore = n
        return true
    }

    static registerModificator({
        name, handler, get, set,
    }) {
        new FieldsContainer([
            ["name"],
            {
                name: new FieldChecker({
                    type: "string",
                    symbols: "a-zA-Z",
                    min: 3,
                    max: 20,
                }),
            },
        ]).set({
            name,
        })

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
}
