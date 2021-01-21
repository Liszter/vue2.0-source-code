/**
 * 该文件主要的功能就是一个整合的功能
 * 
 * 
 * Vue的核心代码 仅仅是一个声明
*/



import { initMixin } from './init'
function Vue(options) {
    // 进行 vue 初始化操作
    this._init(options)
}

// 通过文件的形式 引入 init
initMixin(Vue)

export default Vue