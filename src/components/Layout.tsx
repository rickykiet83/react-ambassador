import Header from './Header';
import Nav from './Nav';
import React from 'react';

export default function Layout(props: any) {
  return (
    <div>
      <Nav />
      <main>
        <Header />
        <div className='album py-5 bg-light'>
          <div className='container'>{props.children}</div>
        </div>
      </main>
    </div>
  );
}
