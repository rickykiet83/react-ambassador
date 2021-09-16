import { IProduct, Product } from '../models/product.model';
import React, { useEffect, useState } from 'react';

import { Filters } from '../models/filter.model';
import Layout from '../components/Layout';
import Products from './Products';
import axios from 'axios';

export default function ProductsFrontend() {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [lastPage, setLastPage] = useState(0);

  const [filters, setFilters] = useState<Filters>({
    s: '',
    sort: '',
    page: 1,
  });

  const perPage = 9;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('products/frontend');
      setAllProducts(data);
      setFilteredProducts(data);
      setLastPage(Math.ceil(data.length / perPage));
    })();
  }, []);

  useEffect(() => {
    let products: IProduct[] = [];
    if (filters.s) {
      products = allProducts.filter(
        (p) =>
          p.title.toLowerCase().indexOf(filters.s.toLowerCase()) > 0 ||
          p.description.toLowerCase().indexOf(filters.s.toLowerCase()) > 0
      );
    } else {
      products = allProducts;
    }

    if (filters.sort === 'asc') {
      products.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
        return 0;
      });
    } else if (filters.sort === 'desc') {
      products.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
      });
    }

    setLastPage(Math.ceil(products.length / perPage));

    setFilteredProducts(products.slice(0, filters.page * perPage));
  }, [filters]);

  return (
    <Layout>
      <Products
        products={filteredProducts}
        filters={filters}
        setFilters={setFilters}
        lastPage={lastPage}
      />
    </Layout>
  );
}
