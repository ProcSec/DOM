import DOMController from "@DOMPath/DOM/Helpers/domController"
import Report from "@Core/Services/reportOld"
import DOM from "@DOMPath/DOM/Classes/dom"

DOMController.registerModificator({
    name: "renderBefore",
    handler(...a) {
        a.forEach((e) => {
            try {
                if (e === null) return
                if (typeof e === "string") e = new DOM({ type: "text", new: e })
                this.elementParse.insertBefore(e)
            } catch (er) {
                Report.write("Render error", er)
            }
        })
    },
})
