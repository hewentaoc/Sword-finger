// 写代码：请求一个require.js文件，并统计文件中'require'的数量，分析时间复杂度，如何优化

let fs = require('fs');
let str = fs.readFileSync('./require.js').toString();
let reg = /\s+/g;
str = str.replace(/\s+/g,',').split(',');
console.log(str);
let count = 0;
for(let i = 0 ; i < str.length ;i ++) {
    if(str[i].indexOf('require') != -1) {
        count++;
    }
}
console.log(count)