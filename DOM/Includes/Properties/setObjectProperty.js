import DOMController from "@DOMPath/DOM/Helpers/domController"

export default (() => {
    const unique = "objectPropertySetter"

    const error = (data) => {
        if (!DOMController.errorIgnore(unique)) throw new Error("Can't set the object property")
        return data.element
    }

    function handlerFunc(data) {
        const self = this
        if (!Array.isArray(data.value)) throw new TypeError("Incorrect objectProperty type")

        data.value.forEach((e) => {
            const {
                name, handler, set, get, writable = false, configurable = false,
            } = e

            if (typeof name !== "string") throw new TypeError(`ObjectProperty name must be string, ${typeof name} given`)
            if (!new RegExp("^[a-zA-Z]{3,20}$").test(name)) throw new TypeError("Incorrect objectProperty name")

            if (name in self) throw new Error(`Method ${name} is already declared`)

            Object.defineProperty(self, name,
                {
                    ...(handler !== undefined ? { value: handler, writable, configurable } : {}),
                    ...(get ? { get } : {}),
                    ...(set ? { set } : {}),
                })
        })

        return data.element
    }

    DOMController.registerProperty({
        name: "objectProperty",
        required: false,
        unique,
        handler: handlerFunc,
        error,
    })
})()
