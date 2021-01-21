// 引入 observe
import { observe } from './observe/index'

export function initState (vm) {
    const opts = vm.$options
    
    // vue 的数据来源  属性 方法 数据 计算属性 watch

    if ( opts.props ) {
        initProps(vm)
    }

    if ( opts.methods ) {
        initMethod(vm)
    }

    if (opts.data) {
        initData(vm)
    }

    if (opts.computed) {
        initComputed(vm)
    }
}
function initProps(vm) {}
function initMethod(vm) {}
function initData(vm) {

    // console.log(vm.$options.data);
    // 数据初始化工作
    let data = vm.$options.data // 用户传递的数据
    // 判断data是否是函数
    data = vm._data = typeof data === 'function'? data.call(vm):data
    // 数据劫持  Object.defineProperty() 给属性增加get方法和set方法
    observe(data) // 响应式原理

}
function initComputed(vm) {}
