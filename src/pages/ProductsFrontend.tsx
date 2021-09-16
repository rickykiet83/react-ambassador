import { IProduct, Product } from '../models/product.model';
import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Products from './Products';
import axios from 'axios';

export default function ProductsFrontend() {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filterProducts, setFilterProducts] = useState<IProduct[]>([]);

  const [filters, setFilters] = useState({
    s: '',
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('products/frontend');
      setAllProducts(data);
      setFilterProducts(data);
    })();
  }, []);

  useEffect(() => {
    let products = allProducts.filter(
      (p) =>
        p.title.toLowerCase().indexOf(filters.s.toLowerCase()) > 0 ||
        p.description.toLowerCase().indexOf(filters.s.toLowerCase()) > 0
    );
    setFilterProducts(products);
  }, [filters]);

  return (
    <Layout>
      <Products
        products={filterProducts}
        filters={filters}
        setFilters={setFilters}
      />
    </Layout>
  );
}
