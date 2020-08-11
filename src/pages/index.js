import React from 'react';

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';

import Header from '@sections/Header';
import About from '@sections/About';
import Footer from '@sections/Footer';

const IndexPage = () => (
  <Layout>
    <Navbar showAbout />
    <Header />
    <About />
    <Footer />
  </Layout>
);

export default IndexPage;
