## typeScript

### 一、

#### 1、开发环境

- 安装nodejs
- 安装typescript：`npm install -g typescript`
- 新建ts文件，进入ts文件所在目录，使用`tsc xxx.ts`编译ts生成js文件

#### 2、基础

- 数据类型：

|  类型   | 描述 |
|  ----  | ----  |
| number | 任意数字 |
| string | 任意字符串 |
| boolean | true or false |
| 字面量 | 限制变量的值就是该字面量的值 |
| any | 任意类型 |
| unknown | 类型安全的any |
| void | 没有值或undefined |
| never | 不能是任何值 |
| object | 任意js对象 |
| array | 任意js数组 |
| tuple | 元组，固定长度的数组 |
| enum | 枚举  enum{A, B} |

- 定义变量时可以用 '|' 连接多个类型，`let a: boolean | string;`

- 类型断言， 手动指定一个值的类型

  ```js
  let a: any;
  a = 'string';
  (a as string).length;
  ```

- 在一个值后加！表示该值不为null和undefined

  ```js
  let el: HTMLelement;
  el = document.getElementById('container')!;	// 如果不加！ts会给出警告，该值可能为空
  ```

#### 3、配置文件

**在项目目录下新建`tsconfig.json`文件。**

```json
{
  "compilerOptions": {
    // 使用的模块版本
    "module": "commonjs",
    // 编译为的js版本
    "target": "es2016",
    "jsx": "preserve",
    "strictFunctionTypes": true,
    // 生成map文件
    "sourceMap": true,
    // 编译后的js文件存放位置
    "outDir": "./target",
    // 将全局作用域中的ts文件编译合并到一个js文件中
    // "outFile": "./target/app.js",
    // 是否编译js文件，默认是false 不编译
    "allowJs": false,
    // 是否检查js文件
    "checkJs": false,
    // 编译时候是否移除注释
    "removeComments": false,
    // 当ts文件有错误时 不编译为js文件
    "noEmitOnError": false,
    // 控制所有的严格检查
    "strict": false,
    // 编译后文件是否使用严格模式
    "alwaysStrict": false,
    // 不允许隐式的any
    "noImplicitAny": false
  },
  // 不编译的目录文件
  "exclude": [
    "node_modules",
    "**/node_modules/*"
  ]
}
```

### 二、面向对象

#### 1、构造函数，super

#### 2、extend 继承，子类重写父类方法

#### 3、abstract 抽象类
- `abstract class Person { ... }`  抽象类只能被继承不能创建实例;
- `abstract doSomething(): void;` 抽象方法只能定义在抽象类中，子类必须对父类的抽象的方法进行实现；
#### 4、interface 接口
- 接口中的属性不能有具体的值，接口中所有方法都是抽象方法，不能有具体实现；
#### 5、setter & getter 存取器
```js
class Person {
    private _id: number;
    private _name?: string;
    constructor(id: number, name: string) {
      this._id = id;
      this._name = name;
    }
    get id() { return this._id; }
    set id(v) { this._id = v; }
    get name() { return this._name }
    set name(v) { this._name = v }
  }
  const p1 = new Person(1000000001, 'zxyong');
  p1.id = 1111111112;
  console.log(p1.id);
}
```
#### 6、泛型
**定义函数或类的时候如果类型不明确就可以使用泛型**
```js
function fn<T>(a: T): T{
    return a;
  }
  fn<number>(123);
```