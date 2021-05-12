  
  export default class Vnode{
      //标签类型、具体的节点、子节点、文本节点中的文本、父节点、节点类型  
      constructor(tag,elem,children,text,data,parent,nodeType){
            this.tag = tag;
            this.elem = elem;
            this.children = children;
            this.text = text;
            this.data = [];
            this.parent = parent;
            this.nodeType = nodeType;
      }
  }