import initMax from './init.js';
import { renderMix } from './render.js';

    function Due(options) {
        this._init(options);
        this.render(this,this.v_node);
    }
    console.log(1,'xxx')
    initMax(Due);
    renderMix(Due);
    export default Due;
    