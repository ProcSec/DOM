import DOMController from "@DOMPath/DOM/Helpers/domController"
import FieldChecker from "@Core/Tools/validation/fieldChecker"

DOMController.registerModificator({
    name: "removeAttributes",
    handler(...a) {
        a.forEach((attr) => {
            new FieldChecker({ type: "string" }).set(attr)

            this.elementParse.native.removeAttribute(attr)
        })
    },
})
