import DOMController from "@DOMPath/DOM/Helpers/domController"
import Report from "@Core/Services/reportOld"
import DOM from "@DOMPath/DOM/Classes/dom"

DOMController.registerModificator({
    name: "prepend",
    handler(...a) {
        a.forEach((e) => {
            try {
                if (e === null) return
                if (typeof e === "string") e = new DOM({ type: "text", new: e })
                this.elementParse.prepend(e)
                this.content.add(e)
            } catch (er) {
                Report.write("Prepend error", er)
            }
        })
    },
})
