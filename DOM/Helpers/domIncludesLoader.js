export default async function domIncludesLoader() {
    const cache = {}

    function importAll(r) {
        r.keys().forEach((key) => { cache[key] = r(key) })
    }

    importAll(require.context("../Includes/Modificators/", true, /\.js$/))
    importAll(require.context("../Includes/Modules/", true, /\.js$/))
    importAll(require.context("../Includes/Properties/", true, /\.js$/))
}
