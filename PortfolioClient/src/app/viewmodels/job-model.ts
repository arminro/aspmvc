export class Job  {
  public employer: string;
  public position: string;
  public startDate: Date;
  public endDate: Date;
  public description: string;
  public userId: string;
  public id: string;


  public constructor(init?: Partial<Job>) {
    Object.assign(this, init);
  }
}
