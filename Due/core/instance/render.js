    let template2Node = new Map();
    let node2Template = new Map();


    export function renderMix(vm){
        vm.prototype.render = function(vm,vnode){
            // console.log(vm,vnode);
            renderNode(vm,vnode);
        }
    }

    function renderNode(vm,vnode){//渲染节点
        if(vnode.nodeType == 3){
            // console.log(vnode.text);
            //  console.log(getTemplate(vnode.text));
            let templist = node2Template.get(vnode);  
            if(templist){
            let result = vnode.text;
                for(let i =0 ; i<templist.length ;i++){
                    let templateValue = getTemplateValue([vm._data],templist[i]);
                    if(templateValue){//替换模板中的值
                        result = result.replace("{{"+templist[i]+"}}",templateValue);
                    }
                };
                vnode.elem.nodeValue = result;
            }
            
        }else{
            for(let i =0 ; i<vnode.children.length;i++){
                 renderNode(vm,vnode.children[i]);
            }
        }

    }

   export function renderData(vm,template){
        // console.log(template);
        let vnode = template2Node.get(template);
        if(vnode!=null){//有的节点为空 要先进行判断
           for(var i = 0; i< vnode.length ;i++){
               renderNode(vm,vnode[i]);
           }
        }
    }

    function getTemplateValue(objs,template){//通过data找到模板中具体值
        for(var i = 0; i<objs.length ;i++){
            let tempValue = getValue(objs[i],template);
            if(tempValue != null){
                return tempValue;
            }
        }
        return null;
    }


    function getValue(obj,temp){//判断data中是否有tempName
        if(!obj){
            return;
        }
        let myobj = obj;
        var namelist = temp.split('.');//解决data.a模板问题
        for(let i = 0; i < namelist.length ;i++){
            if(myobj[namelist[i]]){
                myobj = myobj[namelist[i]];
            }else{
                return undefined;
            }
        }
        return myobj;
    }


    export function perpareRender(vm,vnode){//预备渲染
         if(!vnode){
             return ;
         }
         if(vnode.nodeType == 3){
             analysisTemplate(vnode);
         }
         if(vnode.nodeType == 1){
             for(var i =0 ; i < vnode.children.length; i++){
                  perpareRender(vm , vnode.children[i]);
             }
         }
    }

    function analysisTemplate(vnode){//分析模板
        var tempString = /{{[0-9a-zA-Z_.]+}}/g;
        let templist = vnode.text.match(tempString);
        for(let i =0 ;templist && i<templist.length; i++){
            setTemplate2Node(templist[i],vnode);
            setNode2Template(templist[i],vnode);
        }
    }

    function setTemplate2Node(template,vnode){//从模板到节点
        let templateName = getTemplate(template);
        let node = template2Node.get(templateName);
        if(node){
            node.push(vnode);
        }else{//因为一个模板可能对应多个节点，所以用数组进行存储
            template2Node.set(templateName,[vnode]);
        }
    }

    function setNode2Template(template,vnode){//从节点到模板
       let templateName = getTemplate(template);
       let temp = node2Template.get(vnode);
       if(temp){
          temp.push(templateName);
       }else{//一个节点可能多应多个模板
           node2Template.set(vnode,[templateName]);
       }
    }

    function getTemplate(templateList){//判断模板是否有{{}}
        if(templateList.substring(0,2) == "{{" 
           && templateList.substring(templateList.length-2,templateList.length) == "}}" ){
         
          return templateList.substring(2,templateList.length-2);
        }
    }

    export function testTemplate2Node() {
        return template2Node;
    }
    export function testNode2Template() {
        return node2Template;
    }