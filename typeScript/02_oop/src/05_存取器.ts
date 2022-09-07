{
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