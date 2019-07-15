import FieldsContainer from "@Core/Tools/validation/fieldsContainer"
import FieldChecker from "@Core/Tools/validation/fieldChecker"
import DOMController from "@DOMPath/DOM/Helpers/domController"

DOMController.registerModificator({
    name: "setEvents",
    handler(w) {
        if (!Array.isArray(w)) w = [w]

        try {
            new FieldsContainer([
                "array",
                new FieldsContainer([
                    ["event", "handler"],
                    {
                        event: new FieldChecker({ type: "string" }),
                        handler: new FieldChecker({ type: "function" }),
                        params: new FieldChecker({ type: "object" }),
                    },
                ]),
            ]).set(w)
        } catch (e) {
            throw new Error("Events must be CORRECT object")
        }

        w.forEach((e) => {
            try {
                const self = this

                this.elementParse.native.addEventListener(e.event,
                    // eslint-disable-next-line prefer-arrow-callback, func-names
                    function (...ep) {
                        return e.handler.bind(this)(...ep, self)
                    }, (e.params ? e.params : {}))
            } catch (e2) {
                throw new Error("Failed to set a property")
            }
        })
    },
})
