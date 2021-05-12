import proxyConstructor from './proxy.js';
import { mount } from './mount.js';
    let uid = 0;
    function initMax(Due){
        Due.prototype._init = function(options){
            const vm = this;
            vm.uid = uid++;
            vm.isDue = true;
            if(options && options.data){
                vm._data = proxyConstructor(vm,options.data,"");
            }
            if(options && options.el){
                var odom = document.getElementById(options.el);
                mount(vm,odom);
            }
        }
    }

    export default initMax;