# jest常用语法

## 匹配器

[官网链接](https://jestjs.io/docs/expect)

### 引用或数值相等
    toBe() 

### 内容相等
    toEqual() 

### 判断是否为空
    toBeNull()

### 判断是否undefined
    toBeUndefined() 

### 判断真假
    toBeTruthy()
    toBeFalsy()

### 判断大小
    toBeLessThan()
    toBeGreaterThan()

### 接近
    toBeCloseTo()

### 字符串相关匹配器
    toMatch()
### 数组相关匹配器
    toContain()
### 异常
    toThrow()

## jest 命令行工具使用
```javascript
jest --watchAll

//f: 只测试没有通过的测试
//o；只测试和当前测试相关的文件，需要使用git
// ...
```
## 异步函数测试方法

```javascript
import axios from 'axios';
export const fetchData = (fn) => {
  axios.get('').then((response)=> {
    fn(response.data)
  })
}
//test.js
import  {fetchData} from './fetchData'
/下述代码expect不会运行
test('fetchData 返回结果为{success: true}',()=> {
  fetchData(data => {
    expect(data).toEqual({
      success: true
    })
  })
})
//正确写法,回调函数形式
test('fetchData 返回结果为{success: true}',(done)=> {
  fetchData(data => {
    expect(data).toEqual({
      success: true
    })
    done()
  })
})
//正确写法，如果测试函数返回promise，则可以在then中expect
test('fetchData 返回结果为{success: true}',()=> {
  return fetchData(data).then(res=> {
    expect(data).toEqual({
        success: true
      })
  })
})
//  如果是catch中，则必须要求expect执行一次
test('fetchData 返回结果为404',()=> {
  expect.assertions(1);
  return fetchData().catch(err=> {
    expect(err.toString().indexOf('404') > -1).toBe(true)
  })
})
// 使用resolves方法
test('fetchData 返回结果为{success: true}',()=> {
  return expect(fetchData).resolves.toMatchObject({
        success: true
      })
  })
```
## 钩子函数

```javascript 
// counter.js
export default class Counter {
  constructor() {
    this.number = 0
  }
  addOne() {
    this.number += 1
  }
  minusOne() {
    this.number -= 1
  }
}
// test.js
import Counter from './Counter'
// 钩子函数保证每次测试前都是一个新的类实例
let counter = null;
beforeAll(() => {
  console.log('beforeAll')
})
afterAll(() => {
  console.log('afterAll')
})
beforeEach(() => {
  counter = new Counter()
})
test('测试 Counrer 中的addOne 方法', () => {
  counter.addOne();
  expect(counter.number).toBe(1)
})


```
## mock函数

```javascript 
const func = jest.fn();
expect(func).toBeCalled();
expect(func.mock.calls.length).toBe(2);
expect(func.mock.calls[0]).toEqual('123')
expect(func).toBeCalledWith('abc')
// mock return 结果
expect(func.mockReturnValueOnce('Dell'))
expect(fun)

import axios from 'axios'
jest.mock('axios')
axios.get.mockResolvedValue({data: 'hello'})
await getData().then((data) => {
  expect(data).toBe('hello')
})
```

## vscode jest插件
Jest

## snapshot 快照功能
```javascript
// 每次都生成一个快照，会和上次快照做匹配，如果更新，可以通过交互式命令行u更新快照
// 但是u会全部更新，可以使用i命令依次更新快照
// 如果有动态的属性，可以通过下述方法做测试、
expect(generateConfig()).toMatchSnapShot({
  time: expect.any(Date)
});
```
行内快照文件方法，需要先安装prettier
```javascript
npm install prettier
```
然后将toMatchSnapShot改为toMatchInlineSnapShot
行内快照文件方法，需要安装prettier
```javascript
expect(generateConfig()).toMatchSnapShot({
  time: expect.any(Date)
},
`
Obejct {
  "time": Any<Date>
}
`
);
```


