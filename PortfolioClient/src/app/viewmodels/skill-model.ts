export class Skill  {
  public id: string;
  public skillName: string;
  public skillDescription: string;
  public userId: string;


  // enabling inline init
  public constructor(init?: Partial<Skill>) {
    Object.assign(this, init);
  }
}
