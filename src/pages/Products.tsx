import { Filters } from '../models/filter.model';
import { IProduct } from '../models/product.model';
import React from 'react';

export default function Products(props: {
  products: IProduct[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) {
  const { products } = props;
  const search = (s: string) => {
    props.setFilters({ s });
  };
  return (
    <>
      <div className='col-md-12 mb-4 input-group'>
        <input
          onChange={(e) => search(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Search'
        />
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {products.map((p) => {
          return (
            <div className='col'>
              <div className='card shadow-sm'>
                <img src={p.image} alt={p.title} height={200} />

                <div className='card-body'>
                  <p className='card-text'>{p.description}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                    <small className='text-muted'>${p.price}</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
