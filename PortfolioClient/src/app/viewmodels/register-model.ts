export class Register  {
  public username: string;
  public password: string;
  public name: string;
  public description: string;

  public constructor(init?: Partial<Register>) {
    Object.assign(this, init);
  }
}
