
export class User  {
  public username: string;
  public description: string;
  public name: string;
  public id: string;

  public token: string;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
