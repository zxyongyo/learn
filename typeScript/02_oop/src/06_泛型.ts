{
  function numToString<T>(a: T): T{
    return a;
  }
  numToString<number>(123);

  interface I {
    name: string;
    age: number;
  }
  // 泛型T必须是I的实现类
  function fn<T extends I>(a: T){
    return a;
  }
  const obj: I = {
    name: 'zxyong',
    age: 18
  }
  fn(obj)

  class A <T, K> {
    name: T;
    age: K;
    constructor(name: T, age: K){
      this.name = name;
      this.age = age;
    }
  }

  new A<string, number>('zxyong', 18);
}