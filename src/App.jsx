import './index.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import DesignSkills from './pages/DesignSkills'
import DesignProcess from './pages/DesignProcess'
import Designs from './pages/Designs'
import Other from './pages/Other'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      <main>
        <Home />
        <About />
        <DesignSkills />
        <DesignProcess />
        <Designs />
        <Other />
      </main>
      <Footer />
    </div>
  )
}

export default App