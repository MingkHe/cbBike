export interface IStation {
  id?: number;
  sid?: number;
  name?: string;
}

export class Station implements IStation {
  constructor(public id?: number, public sid?: number, public name?: string) {}
}
