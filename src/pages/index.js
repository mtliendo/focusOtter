import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Layout from '@common/Layout';
import Navbar from '@common/Navbar';

import Header from '@sections/Header';
import About from '@sections/About';
import Footer from '@sections/Footer';

const IndexPage = () => {
  const [authUser, setAuthUser] = React.useState({});

  const fetchUser = async () => {
    const user = await Auth.currentAuthenticatedUser().catch(e => ({}));

    return user;
  };

  function handleSignOut() {
    fetchUser().then(setAuthUser);
  }

  useEffect(() => {
    fetchUser().then(setAuthUser);
  }, []);

  return (
    <Layout>
      <Navbar user={authUser} signOut={handleSignOut}/>
      <Header />
      <About />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
