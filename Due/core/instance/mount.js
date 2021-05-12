import Vnode from "../vnode/vnode.js"
import { perpareRender, testNode2Template, testTemplate2Node } from "./render.js";


export function mount(vm,vNode){
  // console.log(vNode);
  vm.v_node = constructorNode(vm,vNode,null);

  //进行预备渲染,建立模板和节点之间的索引关系
  perpareRender(vm,vm.v_node);
//   console.log(testNode2Template());
//   console.log(testTemplate2Node());
} 

 function constructorNode(vm,node,parent){//创捷节点树
        let child = [];
        let tag = node.nodeName;//标签名
        let data = null;
        let text = getText(node);
        let elem = node;
        let nodeType = node.nodeType;
        let vnode = new Vnode(tag,elem,child,text,data,parent,nodeType);
        let childs = vnode.elem.childNodes;

        for(let i =0 ;i<childs.length ;i++){
            // 我的写法没有自定义虚拟节点
            // 没有将所有的节点都push进children中
            // if(childs[i].nodeType == 1){
            //     constructorNode(vm,childs[i],node);
            // }else if (childs[i].nodeType == 3){
            //     console.log(childs[i])
            //     vnode.children.push(childs[i]);
            // }
            let childNodes = constructorNode(vm,childs[i],vnode);
            if(childNodes instanceof Vnode){//都是Vnode创建的节点
                vnode.children.push(childNodes);
            }else{
                vnode.children = vnode.children.concat(childNodes);
            }
        }
        return vnode;
 }

 function getText(elem){//返回文本节点的value
     if(elem.nodeType == 3){//文本的值
         return elem.nodeValue;
     }else{
         return '';
     }
 }