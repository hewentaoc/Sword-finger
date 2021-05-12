   import {renderData} from './render.js';
   const protoArr = Array.prototype;
   function proxyArrFunc(obj,func,namespace,vm){//监听数组中的方法
        Object.defineProperty(obj,func,{
            enumerable:true,
            configurable:true,
            value:function(...arg){
                // console.log(this,'list');
                const len = protoArr[func].apply(this,arg); 
                // renderData(vm,getNameSpace(namespace));
                return len ;        
            }
        })
   }

   function proxyArr(vm,arr,namespace){//监听对象嵌套的数组方法
        let obj = {
            eleType:'Array',
            push:function(){},
            pop(){},
            shift(){},
            unshift(){}
        }
        proxyArrFunc.call(vm,obj,'push',namespace,vm);
        proxyArrFunc.call(vm,obj,'pop',namespace,vm);
        proxyArrFunc.call(vm,obj,'shift',namespace,vm);
        proxyArrFunc.call(vm,obj,'unshift',namespace,vm);
        arr.__proto__ = obj;
        return arr;
   }


   function proxyObject(vm,obj,namespace){//监听对象嵌套的函数
       let proxyObj = {};
       for(let prop in obj ){
           //挂载在_data对象上
           Object.defineProperty(proxyObj,prop,{
               configurable:true,
               set:function(val){
                    // console.log(getNameSpace(namespace,prop),'1')
                    obj[prop] = val;
                    renderData(vm,getNameSpace(namespace,prop));
               },
               get(){
                   return obj[prop];
               }
           });
           //挂载在vm上    
           Object.defineProperty(vm,prop,{
            configurable:true,
            
            get(){
                // console.log('get')
                return obj[prop];
            },
            set:function(val){
                // console.log('set')
                obj[prop] = val;      
                renderData(vm,getNameSpace(namespace,prop));
           }
        })

        if(obj[prop] instanceof Object){ //数组和对象都 instanceof Object
            proxyObj[prop] = proxyConstructor( vm, obj[prop] , getNameSpace(namespace,prop));
        }
       }
       return proxyObj;
   }


   function proxyConstructor(vm,obj,namespace){//进行代理数组和对象
        let proxyObj = null
        if(obj instanceof Array){//数组
            // console.log(obj.length);
            proxyObj = new Array(obj.length);
            for(var i = 0 ; i< obj.length ; i++){
                proxyArr[i] = proxyObject(vm,obj[i],namespace);
            }
            proxyObj = proxyArr(vm,obj,namespace)

        }else if (obj instanceof Object){//对象
            proxyObj = proxyObject(vm,obj,namespace);
        }else{
            throw new Error('dd');
        }
        return proxyObj;
   }

   function getNameSpace(nowNamespace,nowProp){//命名空间
        if(nowNamespace == null || nowNamespace == ""){
            return nowProp;
        }else if (nowProp == null || nowProp== ""){
            return nowNamespace;
        }else{
            return nowNamespace + "." + nowProp;
        }
   }

   export default proxyConstructor;