import React from 'react';

import Menu from './PageElements/Menu';
import Footer from './PageElements/Footer';

import Pizza from './PageElements/Pizza';
import Delivery from './PageElements/Delivery';
import Advertising from './PageElements/Advertising';

export default function App() {
  return (
    <div>
        <Menu/>

        <Pizza/>
        <Advertising/>
        <Delivery/>

        <br/>
        <Footer/>
    </div>
  )
}
