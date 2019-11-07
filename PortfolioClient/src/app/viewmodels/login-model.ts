export class Login  {
  public username: string;
  public password: string;


  public constructor(init?: Partial<Login>) {
    Object.assign(this, init);
  }
}
