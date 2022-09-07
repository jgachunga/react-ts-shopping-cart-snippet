import { Container } from 'react-bootstrap';
import { Routes, Route} from 'react-router-dom';
import { About } from './features/about/about';
import { Home } from './features/StoreHome/Home';
import { StoreCart } from './features/StoreHome/Store';
import { Navbar } from './components/Navbar';
import { ShoppingcartProvider } from './context/shoppingCartContext';

function App() {
  return (
    <ShoppingcartProvider>
    <Navbar/>
    <Container>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/store" element={<StoreCart/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Container>
    </ShoppingcartProvider>
  )
}

export default App
