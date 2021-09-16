import { IProduct, Product } from '../models/product.model';
import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Products from './Products';
import axios from 'axios';

export default function ProductsBackend() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('products/backend');
      setProducts(data.data);
    })();
  }, []);
  return (
    <Layout>
      <Products products={products} />
    </Layout>
  );
}
