// import data from '../data.js';
import { Link } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";

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
          products.map((prod) => (
            <div className="product" key={prod.slug}>
              <Link to={`/product/${prod.slug}`}>
                <img src={prod.image} alt={prod.name} />
              </Link>
              <div className="product-info">
                <p>{prod.name}</p>
                <p>
                  <strong>$</strong>
                  {prod.price}
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
