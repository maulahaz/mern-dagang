import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter> 
    <div className='d-flex flex-column site-container' >
      <header>
        <Navbar bg="dark" variant="dark">
          <Container> 
          <LinkContainer to="/">
            <Navbar.Brand>Amazona</Navbar.Brand>
          </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-4">
          <Routes>
            <Route path={`/`} element={<HomePage/>} />
            <Route path={`/api/products/slug/:slug`} element={<ProductPage/>} />
          </Routes>
        </Container>
      </main>  
      <footer>
        <div className='text-center'>All right reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
