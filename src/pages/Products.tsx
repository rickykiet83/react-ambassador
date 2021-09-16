import React, { useState } from 'react';

import { Filters } from '../models/filter.model';
import { IProduct } from '../models/product.model';
import axios from 'axios';

export default function Products(props: {
  products: IProduct[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
  lastPage: number;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: '',
  });

  const { products } = props;
  const search = (s: string) => {
    props.setFilters({ ...props.filters, s, page: 1 });
  };

  const sort = (sort: string) => {
    props.setFilters({
      ...props.filters,
      sort,
      page: 1,
    });
  };

  const loadMore = () => {
    props.setFilters({
      ...props.filters,
      page: props.filters.page + 1,
    });
  };

  let button;

  if (props.filters.page !== props.lastPage) {
    button = (
      <div className='d-flex justify-content-center mt-4'>
        <button onClick={loadMore} className='btn btn-primary'>
          Load More
        </button>
      </div>
    );
  }

  const select = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  const generate = async () => {
    try {
      const { data } = await axios.post('links', {
        products: selected,
      });

      setNotify({
        show: true,
        error: false,
        message: `Link generated: http://localhost:5000/${data.code} `,
      });
    } catch (error) {
      setNotify({
        show: true,
        error: true,
        message: 'You should be logged in to generate a link',
      });
    } finally {
      setTimeout(() => {
        setNotify({
          show: false,
          error: false,
          message: '',
        });
      }, 3000);
    }
  };

  let generatedButton, info;

  if (selected.length > 0) {
    generatedButton = (
      <div className='input-group-append'>
        <button onClick={generate} className='btn btn-info'>
          Generate Link
        </button>
      </div>
    );
  }

  if (notify.show) {
    info = (
      <div className='col-md-12 mb-4'>
        <div
          className={notify.error ? 'alert alert-danger' : 'alert alert-info'}
          role='alert'
        >
          {notify.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {info}
      <div className='col-md-12 mb-4 input-group'>
        <input
          onChange={(e) => search(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Search'
        />
        {generatedButton}
        <div className='input-group-append'>
          <select
            onChange={(e) => sort(e.target.value)}
            name='sorting'
            id='sorting'
            className='form-select'
          >
            <option>Select</option>
            <option value='asc'>Price Ascending</option>
            <option value='desc'>Price Descending</option>
          </select>
        </div>
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {products.map((p) => {
          return (
            <div className='col' key={p.id} onClick={() => select(p.id)}>
              <div
                className={
                  selected.some((s) => s === p.id)
                    ? 'card shadow-sm selected'
                    : 'card shadow-sm'
                }
              >
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
      {button}
    </>
  );
}
