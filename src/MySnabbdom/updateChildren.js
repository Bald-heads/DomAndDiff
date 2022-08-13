import patchVNode from "./patchVNode";
import createElements from "./createElements";

//Determine whether it is a node
function checkSameVNode(a, b) {
    return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
    //Old before
    let oldStartIdx = 0
    //Before the new
    let newStartIdx = 0
    //After the old
    let oldEndIdx = oldCh.length - 1
    //After the new
    let newEndIdx = newCh.length - 1
    //Before the old node
    let oldStartVNode = oldCh[0]
    //After the old node
    let oldEndVNode = oldCh[oldEndIdx]
    //Before the new node
    let newStartVNode = newCh[0]
    //After the new node
    let newEndVNode = newCh[newEndIdx]
    let keyMap = null
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.log("******************")
        switch (undefined) {
            case oldStartVNode || oldCh[oldStartIdx]:
                oldStartVNode = oldCh[++oldStartIdx]
                break
            case oldEndVNode || oldCh[oldEndIdx]:
                oldEndVNode = oldCh[--oldEndIdx]
                break
            case newStartVNode || newCh[newStartIdx]:
                newStartVNode = newCh[++newStartIdx]
                break
            case newEndVNode || newCh[newEndIdx]:
                newEndVNode = newCh[--newEndIdx]
                break
            default:
                //Before the new and before the old hit
                if (checkSameVNode(oldStartVNode, newStartVNode)) {
                    patchVNode(oldStartVNode, newStartVNode)
                    oldStartVNode = oldCh[++oldStartIdx]
                    newStartVNode = newCh[++newStartIdx]
                }
                //The new back hits the old back
                else if (checkSameVNode(oldEndVNode, newEndVNode)) {
                    patchVNode(oldEndVNode, newEndVNode)
                    oldEndVNode = oldCh[--oldEndIdx]
                    newEndVNode = newCh[--newEndIdx]
                }
                //The new post hits the old front
                else if (checkSameVNode(oldStartVNode, newEndVNode)) {
                    patchVNode(oldStartVNode, newEndVNode)
                    parentElm.insertBefore(oldStartVNode.elm, oldEndVNode.elm.nextSibling)
                    oldStartVNode = oldCh[++oldStartIdx]
                    newEndVNode = newCh[--newEndIdx]
                }
                //New before and old after hit
                else if (checkSameVNode(oldEndVNode, newStartIdx)) {
                    patchVNode(oldEndVNode, newStartVNode)
                    parentElm.insertBefore(oldEndVNode.elm, oldStartVNode.elm)
                    oldEndVNode = oldCh[--oldEndIdx]
                    newStartIdx = newCh[++newStartIdx]
                }
                //None of them hit
                else {
                    if (!keyMap) {
                        keyMap = {}
                        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                            const key = oldCh[i].key
                            if (key !== undefined) {
                                keyMap[key] = i
                            }
                        }
                    }
                    const idxInOld = keyMap[newStartVNode.key]
                    if (idxInOld === undefined) {
                        parentElm.insertBefore(createElements(newStartVNode), oldStartVNode.elm)
                    } else {
                        const elmToMove = oldCh[idxInOld]
                        patchVNode(elmToMove, newStartVNode)
                        oldCh[idxInOld] = undefined
                        parentElm.insertBefore(elmToMove.elm, oldStartVNode.elm)
                    }
                    newStartVNode = newCh[++newStartIdx]
                }
        }
    }
    //After the loop ends, start is still smaller than old
    if (newStartIdx <= newEndIdx) {
        const before = newCh[newEndIdx + 1] === undefined ? null : newCh[newEndIdx + 1].elm
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElements(newCh[i]), before)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }
}