import { IUser, User } from '../models/user.model';
import React, { Dispatch, useEffect } from 'react';

import Header from './Header';
import Nav from './Nav';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

const Layout = (props: any) => {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('user');
        if (response) {
          const user: IUser = response.data;
          props.setUser(
            new User(user.id, user.first_name, user.last_name, user.email)
          );
        }
      } catch (error) {}
    })();
  }, []);

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
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
