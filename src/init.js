import { initState } from './state'

import { CompileToFunction } f
// 在原型上添加一个init方法

export function initMixin (Vue) {
    // 初始化操作
    Vue.prototype._init = function (options) {
        // 数据劫持
        const vm = this // vue使用 this.$options 指代的就是用户传递的属性
        vm.$options = options
        // 初始化状态
        initState(vm); // 分割代码
        // 如果用户传了一个 el 属性 需要将页面渲染出来
        // 如果用户传入了el 就要实现挂在流程
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)
        // 查找顺序 1 render方法，2 template 3 el中的内容
        if (!options.render) {
            // 模板编译
            let template = options.template // 取出模板
            if (!template && el) {
                template = el.outerHTML
            }

        console.log(template);
        // 将template转换成render方法
        const render = CompileToFunction(template)
        options.render = render

        }

    }
}


