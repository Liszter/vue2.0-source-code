// Object.defineProperty 是es5 的东西 其不兼容ie8以下版本

import util from '../utils/index'
import { arrayMethods } from './array.js' 
export function observe (data) {
    // 不是对象就返回 是就观测
    if (!util.CheckType.isObject(data)) {
        return
    }
    return new Observer(data)






}

class Observer {
    constructor(value) {
        // value.__ob__ = this
        Object.defineProperty(value, '__ob__', {
            enumerable: false, // 不可枚举
            configurable: false, // 不可设置
            value: this
        })

        // vue 数据的层次过多  需要递归的去解析对象中的属性，以此增加set和get方法
        if (util.CheckType.isArray(value)) {
            // 如果是数组的话并不会对索引进行观测 以为会导致性能问题

            // 还需重写 push pop shift unshift
            value.__proto__ = arrayMethods

            // 如果数组里放的是对象再进行监控 
            this.observerArray(value)

        } else {
            // vue 如果数据的层次过多，需要递归的去解析对象中的属性，依次增加set 和 get 方法
            this.walk(value)
        }
     
    }

    observerArray(value) {
        for (let i = 0; i < value.length; i++) {
            observe(value[i])
        }
    }

    walk(data) {
        let keys = Object.keys(data) // 取出 data中的key 数组
        keys.forEach((key) => {
            // 定义响应式数据

            defineReactive(data, key, data[key])
            
        });
    }
}
// 第一版 只针对 单层对象
// function  defineReactive(data, key, value) {
//     Object.defineProperty(data, key, {
//         get () { // 获取值的时候做一些操作
//             return value
//         },
//         set (newValue) { // 设置值的时候可以做一些操作
//             if (newValue === value) return
//             value = newValue
//         }
//     })
// }

// 第二版 针对 深度对象
// function  defineReactive(data, key, value) {
//     observe(value) // 递归实现深度检测
//     Object.defineProperty(data, key, {
//         get () { // 获取值的时候做一些操作
//             return value
//         },
//         set (newValue) { // 设置值的时候可以做一些操作
//             if (newValue === value) return
//             value = newValue
//         }
//     })
// }

// 第三版 如果赋值为一个对象
// 第二版 针对 深度对象
function  defineReactive(data, key, value) {
    observe(value) // 递归实现深度检测
    Object.defineProperty(data, key, {
        get () { // 获取值的时候做一些操作
            return value
        },
        set (newValue) { // 设置值的时候可以做一些操作
            if (newValue === value) return
            observe(newValue) // 每次设置值之后 继续劫持用户设置的值 
            value = newValue
        }
    })
}