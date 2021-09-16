import React, { Dispatch, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { User } from '../models/user.model';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

const Header = (props: { user: User }) => {
  const [title, setTitle] = useState('Welcome');
  const [description, setDescription] = useState('Share links to earn money');

  useEffect(() => {
    (async () => {
      if (props.user?.id) {
        setTitle(`${props.user.revenue}`);
        setDescription('You have earned this far.');
      } else {
        setTitle('Welcome');
        setDescription('Share links to earn money');
      }
    })();
  }, []);

  const buttons = () => {
    if (!props.user?.id)
      return (
        <p>
          <Link to='/login' className='btn btn-primary m-2'>
            Login
          </Link>
          <Link to='/register' className='btn btn-secondary m-2'>
            Register
          </Link>
        </p>
      );
  };

  return (
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-6 col-md-8 mx-auto'>
          <h1 className='fw-light'>{title}</h1>
          <p className='lead text-muted'>{description}</p>
          {buttons()}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
