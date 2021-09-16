import React, { useEffect, useState } from 'react';

import { IProduct } from '../models/product.model';
import Layout from '../components/Layout';
import Products from './Products';
import axios from 'axios';

export default function ProductsFrontend() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('products/frontend');
      setProducts(data);
    })();
  }, []);
  return (
    <Layout>
      <Products products={products} />
    </Layout>
  );
}
