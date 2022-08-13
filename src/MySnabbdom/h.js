import vNode from "./vNode";

export default function h(sel, data, c) {
    if (arguments.length !== 3) throw new Error("The h function must take three arguments")
    if (typeof c === "string" || typeof c === "number") {
        return vNode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        let children = []
        for (let i = 0; i < c.length; i++) {
            if (typeof c[i] !== "object" && !c[i].hasOwnProperty('sel'))
                throw new Error("One or more of the items passed into your array are not H-functions")
            children.push(c[i])
        }
        return vNode(sel, data, children, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        let children = [c]
        return vNode(sel, data, children, undefined, undefined)
    } else {
        throw new Error("The third type passed into the function is incorrect")
    }
}