import DOMController from "@DOMPath/DOM/Helpers/domController"
import FieldChecker from "@Core/Tools/validation/fieldChecker"
import FieldsContainer from "@Core/Tools/validation/fieldsContainer"

DOMController.registerModificator({
    name: "setAttributes",
    handler(...a) {
        a.forEach((attr) => {
            new FieldsContainer([
                ["name", "value"],
                { name: new FieldChecker({ type: "string" }) },
            ]).set(attr)

            this.elementParse.native.setAttribute(attr.name, attr.value)
        })
    },
})
