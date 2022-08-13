export default function vNode(sel, data, children, text, elm) {
    //The function passes an argument to an object and returns it
    const key = data.key
    return {
        sel, data, children, text, elm, key
    }
}