export interface IProduct {
  id: number | null;
  title: string;
  description: string;
  image: string;
  price: number | null;
}

export class Product implements IProduct {
  constructor(public id: number | null = null, public title: string = '',
    public description = '', public image = '', public price: number | null = 0) { }
}
