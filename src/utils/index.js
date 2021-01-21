/****
 * 
 * 判断数据类型
 * 
 * @param    ''
 * @returns CheckType
 * 
 * 用例
 * 
 * 
 * let a = 'asdasd'
 * console.log(CheckType.isString(a));
 * ***/
let CheckType = {}
function isType(type) {
    return function  (obj) {
        return Object.prototype.toString.call(obj).includes(type)
    }
}    
const types = ['String', 'Number', 'Array', 'Boolean', 'Null', 'Object', 'Undefined', 'RegExp', 'Date']
types.forEach(type => {
    CheckType['is' + type] = isType(type)
})

export default {
    CheckType
}