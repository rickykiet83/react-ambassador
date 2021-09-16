export interface IUser {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  password?: string | null;
  revenue?: number;
}

export class User implements IUser {
  id: number | null;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password?: null;
  revenue?: number;
  constructor(id: number | null = null, first_name = '', last_name = '', email: string = '',
    revenue = 0) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.revenue = revenue || 0;
  }
}
