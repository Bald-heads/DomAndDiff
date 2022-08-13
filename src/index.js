import h from './MySnabbdom/h'
import patch from "./MySnabbdom/patch";

// let myVNode1 = h('h1', {}, [
//     h('h2', {}, "hello"),
//     h('h2', {}, [
//         h('ol', {key:"a"}, 111),
//         h('ol', {key:"b"}, 222),
//         h('ol', {key:"c"}, 333)
//     ]),
//     h('h2', {}, "hello-hi")
// ])
// let myVNode2 = h('h1', {}, [
//     h('h2', {}, "hello"),
//     h('h2', {}, [
//         h('ol', {key:"a"}, 111),
//         h('ol', {key:"b"}, 222),
//         h('ol', {key:"c"}, 333),
//         h('ol', {key:"d"}, 444),
//     ]),
//     h('h2', {}, "hello-hi")
// ])
// let myVNode1 = h('h1', {}, "hello")
let myVNode1 = h('h1', {}, [
    h('h2', {key: "a"}, "a"),
    h('h2', {key: "b"}, "b"),
    h("h2", {key: "c"}, "c"),
    h("h2", {key: "d"}, "d"),
    h("h2", {key: "e"}, "e"),
    h("h2", {key: "f"}, "f"),
])

let myVNode2 = h('h1', {}, [
    h("h2", {key: "f"}, "f"),
    h('h2', {key: "a"}, "a"),
    h("h2", {key: "e"}, "e"),
    h("h2", {key: "d"}, "d"),
    h("h2", {key: "g"}, "g"),
    h("h2", {key: "c"}, "c"),
])
const div = document.querySelector("div")


patch(div, myVNode1)

document.querySelector("button").addEventListener("click", () => {
    patch(myVNode1, myVNode2)
})