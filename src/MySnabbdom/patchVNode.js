import createElements from "./createElements";
import updateChildren from "./updateChildren";

export default function patchVNode(oldVNode, newVNode) {
    if (oldVNode === newVNode) return
    if (newVNode.hasOwnProperty("text") && newVNode.children === undefined || newVNode.children.length === 0) {
        //The new node has no text property
        if (newVNode.text !== oldVNode.text) oldVNode.elm.innerText = newVNode.text
    } else {
        if (oldVNode.children !== undefined && oldVNode.children.length > 0) {
            updateChildren(oldVNode.elm, oldVNode.children, newVNode.children)
        } else {
            oldVNode.elm.innerHTML = ""
            newVNode.children.forEach(object => oldVNode.elm.appendChild(createElements(object)))
        }
    }
}