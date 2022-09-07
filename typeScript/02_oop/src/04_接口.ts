{
  interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
  }

  const Tom: Person = {
    id: 111,
    name: 'Tom',
    age: 18,
    hobby: 'coding'
  }
  console.log(Tom)

  interface Animal{
    type: string;
    name: string;
    age?: number;

    shout(noise: string): void;
  }
  class Cat implements Animal {
    type: string;
    name: string;
    constructor(type: string, name: string){
      this.type = type;
      this.name = name;
    }
    shout(noise: string){
      console.log(noise)
    }
  }
  let c1 = new Cat('cat', 'Jeery');
  c1.shout('miao~');
}