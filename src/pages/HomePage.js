// import data from '../data.js';

import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }

      // setProduct(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Feuture Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error : {error}</div>
        ) : (
          <Row>
          {products.map((prod) => (
            <Col key={prod.slug} sm={6} md={4} lg={3} className="mb-3">
              <Product product={prod}></Product>
            </Col>
          ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
