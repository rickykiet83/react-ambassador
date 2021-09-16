import { IProduct, Product } from '../models/product.model';
import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Products from './Products';
import axios from 'axios';

export default function ProductsBackend() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filters, setFilters] = useState({
    s: '',
  });
  useEffect(() => {
    (async () => {
      const arr = [];
      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }
      const { data } = await axios.get(`products/backend?${arr.join('&')}`);
      setProducts(data.data);
    })();
  }, [filters]);

  return (
    <Layout>
      <Products products={products} filters={filters} setFilters={setFilters} />
    </Layout>
  );
}
