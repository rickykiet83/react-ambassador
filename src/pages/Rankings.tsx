import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import axios from 'axios';

export default function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('rankings');
      setRankings(data);
    })();
  }, []);

  return (
    <Layout>
      <div className='table-responsive'>
        <table className='table table-stripe table-sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(rankings).map((key: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{key}</td>
                  <td>{rankings[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
