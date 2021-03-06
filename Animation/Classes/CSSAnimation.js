export default class CSSAnimation {
    constructor({
        duration = 200,
        start = {},
        end = {},
        timingFunc = "linear",
    }) {
        this.duration = duration
        this.start = start
        this.end = end
        this.timingFunc = timingFunc
    }

    async apply(el) {
        const self = this
        el.style({ transition: `all ${this.duration}ms`, transitionTimingFunction: this.timingFunc, ...this.start })
        requestAnimationFrame(() => {
            el.style(self.end)
        })
        await new Promise((resolve) => setTimeout(resolve, this.duration))
        return el
    }
}
