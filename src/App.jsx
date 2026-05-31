import './index.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'

import DesignSkills from './pages/DesignSkills'
import SOT from './pages/SOT'
import DesignProcess from './pages/DesignProcess'
import Designs from './pages/Designs'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <About />
        <DesignSkills />
        {/* <SOT /> */}
        <DesignProcess />
        <Designs />
      </main>
      <Footer />
    </div>
  )
}

export default App