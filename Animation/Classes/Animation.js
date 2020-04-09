import Linear from "../Library/Timing/linear"

export default class Animation {
    constructor({
        duration, painter = () => { }, init = () => { }, end = () => { }, timingFunc = Linear,
    }) {
        if (typeof duration !== "number" || !Number.isInteger(duration)) throw new Error(`Duration must be integer, ${typeof duration} given`)
        if (typeof painter !== "function") throw new Error(`painter must be function, ${typeof painter} given`)
        if (typeof timingFunc !== "function") throw new Error(`timingFunc must be function, ${typeof timingFunc} given`)
        if (typeof init !== "function") throw new Error(`init must be function, ${typeof init} given`)
        if (typeof end !== "function") throw new Error(`end must be function, ${typeof end} given`)

        this.duration = duration
        this.painter = painter
        this.timingFunc = timingFunc
        this.init = init
        this.end = end
    }

    animate(element) {
        return new Promise(async (resolve, reject) => {
            const init = await this.init(element)
            const start = performance.now()

            let animate = async (time) => {
                let timeProgress = (time - start) / this.duration
                if (timeProgress > 1) timeProgress = 1

                const effectProgress = this.timingFunc(timeProgress)
                this.painter.bind(element)(effectProgress)

                if (timeProgress < 1) {
                    requestAnimationFrame(animate, init)
                } else {
                    await this.end(element)
                    resolve(element)
                }
            }

            animate = animate.bind(this)

            requestAnimationFrame(animate, init)
        })
    }

    apply(...data) {
        return this.animate(...data)
    }

    applyCallback({ data = [], callback = () => { } }) {
        this.animate(...data)
            .then((e) => callback(e))
    }

    applyChain(...data) {
        this.animate(...data)
        return this
    }

    async applyWaitChain(...data) {
        await this.animate(...data)
        return this
    }
}
