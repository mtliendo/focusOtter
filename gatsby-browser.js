// /**
//  * Implement Gatsby's Browser APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/browser-apis/
//  */

import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { setUser } from './src/utils/auth';
import config from './src/aws-exports';
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure(config);

export const onRouteUpdate = (state, page, pages) => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      const userInfo = {
        ...user.attributes,
        username: user.username,
      };
      setUser(userInfo);
    })
    .catch(err => {
      window.localStorage.setItem('gatsbyUser', null);
    });
};
