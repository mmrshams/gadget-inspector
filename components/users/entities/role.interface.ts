export class RoleInterface {
  constructor(data: Partial<RoleInterface>) {
    Object.assign(this, data);
  }
  id!: string;

  role!: string;
}
