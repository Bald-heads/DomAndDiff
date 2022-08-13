import vNode from "./vNode";
import createElements from "./createElements";
import patchVNode from "./patchVNode";

export default function patch(oldVNode, newVNode) {
    //Determine whether the old node is a virtual DOM or a DOM
    if (oldVNode.sel === '' || oldVNode.sel === undefined) {
        //Wrapped as a virtual DOM
        oldVNode = vNode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
    }
    //Check whether oldVNode and newVNode are the same node
    if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
        //If so, refine the update
        patchVNode(oldVNode, newVNode)
    } else {
        //If not, take it apart violently and renew it
        let newVNodeDom = createElements(newVNode)
        if (oldVNode.elm && newVNodeDom) {
            oldVNode.elm.parentNode.insertBefore(newVNodeDom, oldVNode.elm)
        }
        //Deleting an Old Node
        oldVNode.elm.parentNode.removeChild(oldVNode.elm)
    }
}