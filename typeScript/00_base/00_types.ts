
// 定义一个变量num 指定类型为number
let num: number;

num = 2;

// 声明一个函数sum 接受两个number类型的参数，返回一个number
function sum(a: number, b: number): number{
  return a + b;
}

// 定义一个变量sex，值只能是'male'或'female'
let sex: 'male' | 'female';

let a:unknown;
a = 'hello';
let b:string;
// 类型断言
b = a as string;
b = <string>a;

interface Cat {
  name: string;
  run(): void;
}
interface fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | fish): boolean {
  if(typeof (animal as fish).swim === 'function'){
    return true;
  }
  return false;
}

// 定义一个对象，必须包含一个name属性，age属性可有可无
let obj: { name: string, age?: number };
obj = { name: 'zxyong', age: 8 };

// 定义一个对象，必须包含一个name属性，和任意个字符串key 任意类型值的属性
let obj1: { name: string, [propertyName: string]: unknown };
obj1 = { name: 'zxyong', height: 180, weight: 70 };

let sum1: (a: number, b:number) => number;
sum1 = function (n1, n2){
  return n1 + n2;
}

// 定义一个只有字符串类型的数组，
let arr: string[];
let arr1: Array<string>;

// 定义一个元组，只有一个字符串一个数字
let tup: [string, number];
tup = ['hello', 8];

// 定义一个枚举，0-Male, 1-Female
enum gender { Male, Female };

// 定义一个类型的别名 myType
type myType = 1 | 2 | 3 | 4;
let i: myType;