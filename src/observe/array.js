// 重写会改变原数组的方法
// push pop shift unshift pop reverse sort splice 



// 拿到数组原来的方法
const oldArrayMethods = Array.prototype

// 原型链查找的问题 （向上查找， 先查找重写的，重写的没有会继续向上查找）
export let arrayMethods = Object.create(oldArrayMethods)
// arrayMethods.__proto__ 是 oldArrayMethods

const methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'reverse',
    'sort',
    'splice'
]
// 开始添加自己重写的方法
arrayMethods.forEach(method => {
    arrayMethods[method] = function (...args) {
        const result = oldArrayMethods[method].apply(this, args) // 调用原生的数组方法
        // push unshift 添加的元素可能还是一个对象

        let inserted // 用户插入的数据
        let ob = this.__ob__

        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                // splice 要传递3个参数， 第三个参数是传递的对象
                inserted = args.slice(2)
                default:
                    break;
        }

        if (inserted) {
            ob.observerArray(inserted)
        }
        return result   
    }
});