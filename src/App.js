import React from 'react';
import './index.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Illustrations from './pages/Illustrations';
import SOT from './pages/SOT';
import DesignProcess from './pages/DesignProcess';
import Designs from './pages/Designs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <About />
        <Illustrations />
        <SOT />
        <DesignProcess />
        <Designs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
