// 父类
class Animal {
  aname: string;
  age: number;
  constructor(aname: string, age: number){
    this.aname = aname;
    this.age = age;
  }
  shout(){
    alert('动物在叫')
  }
}

// 子类
class Dog extends Animal {
  kind: string;
  constructor(aname: string, age: number, kind?: string){
    super(aname, age);
    this.kind = kind || "土狗";
  }
  // 子类重写父类方法
  shout(){
    alert('汪汪汪')
  }
}

const dog = new Dog('dog', 1, '哈士奇');
// dog.shout();
console.log(dog)