
class Person {

  uname: string;
  age: number;
  
  constructor(uname: string, age: number) {
    this.uname = uname;
    this.age = age;
    this.say();
  }
  say(){
    alert(`I am ${this.uname}, ${this.age} years old.`)
  }
}

const p1 = new Person('zxyong', 18);
const p2 = new Person('zxhngdada', 33);
console.log(p1);
