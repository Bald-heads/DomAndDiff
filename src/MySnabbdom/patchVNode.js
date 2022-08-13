import createElements from "./createElements";

export default function patchVNode(oldVNode, newVNode) {
    if (oldVNode === newVNode) return
    if (newVNode.hasOwnProperty("text") && newVNode.children === undefined || newVNode.children.length === 0) {
        //The new node has no text property
        if (newVNode.text !== oldVNode.text) oldVNode.elm.innerText = newVNode.text
    }
    if (oldVNode.children !== undefined && oldVNode.children.length > 0) {
        console.log("***************************")


        
    } else {
        oldVNode.elm.innerHTML = ""
        console.log(newVNode.children)
        newVNode.children.forEach(object => oldVNode.elm.appendChild(createElements(object)))
    }
}