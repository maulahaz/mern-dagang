import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Rating from './Rating';

function Product(props) {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Rating rating={product.rating} numReview={product.numReviews} />
        <Card.Text>{product.price}</Card.Text>
        <Button>Add to cart</Button> 
      </Card.Body>
    </Card>
  );
}

export default Product;