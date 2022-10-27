export class UserInterface {
    constructor(data: Partial<UserInterface>) {
      Object.assign(this, data);
    }
    id!: string;
  
    uuid!: string;
  
    email!: string;
  }