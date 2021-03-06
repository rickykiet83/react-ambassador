export interface IProduct {
  id: number | any;
  title: string;
  description: string;
  image: string;
  price: number;
}

export class Product implements IProduct {
  constructor(public id: number | null = null, public title: string = '',
    public description = '', public image = '', public price: number = 0) { }
}
