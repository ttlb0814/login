import that from '../src/main'
let a =1
let obj = {name: 'a', age: 18, sex: '男'}
let arr = [{name: 'a', age: 18, sex: '男'}, {name: 'b', age: 17, sex: '女'}]
console.log(this)
 const fun1 = () => {
  console.log(that.$store.state.msg)
  console.log(obj)
  console.log(Object.keys(obj))

  for (let key of arr) {
    console.log(key)
  }
  const lorem = 'Lorem ipsum dolor sit amet, consectetur\n\t'
    + 'adipisicing elit, sed do eiusmod tempor incididunt\n\t'

    + 'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'

    + 'veniam, quis nostrud exercitation ullamco laboris\n\t'

    + 'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'

    + 'irure dolor in reprehenderit in voluptate velit esse.\n\t'
  console.log(lorem)
}

function fun2() {
  console.log(obj)
  for (let key in obj) {
    console.log(key)
    console.log(key + ':' + obj[key])
    console.log(`${key}: ${obj[key]}`)
    Object.defineProperty(obj, key,{enumerable: true} )
  }

}

let fun3 = () => {
  let idx = arr.findIndex(item => item.age > 17)
  console.log(idx)
  let num = 4.9
  console.log(~~num)
  const arr1 = [1, 2, 3]
  const arr2 = [2, 3, 4, 5]
  let arr3 = [...arr1, ...arr2]
  console.log(arr3)
  console.log(new Set(arr3))
}

export default {
  fun1,
  fun2,
  fun3
}
