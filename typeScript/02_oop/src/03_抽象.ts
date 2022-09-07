
{
  abstract class Animal {
    aname: string;
    age: number;
    constructor(aname: string, age: number){
      this.aname = aname;
      this.age = age;
    }
    abstract shout(): void;
  }
  
  class Dog extends Animal {
    kind: string;
    constructor(aname: string, age: number, kind?: string){
      super(aname, age);
      this.kind = kind || "土狗";
    }
    shout(){
      console.log('汪汪汪')
    }
  }
  
  const dog = new Dog('dog', 1, '哈士奇');
  dog.shout();
  console.log(dog)


}