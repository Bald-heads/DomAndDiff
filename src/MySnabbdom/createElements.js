export default function createElements(vNode) {
    //This function creates the actual node
    let domNode = document.createElement(vNode.sel)
    //Determine whether there are children or text
    if (vNode.text !== "" && vNode.children === undefined || vNode.children.length === 0) {
        domNode.innerHTML = vNode.text
    } else if (Array.isArray(vNode.children) && vNode.children.length > 0) {
        //Internal child nodes to recurse, create child nodes
        vNode.children.forEach(object => domNode.appendChild(createElements(object)))
    }
    vNode.elm = domNode

    return vNode.elm
}