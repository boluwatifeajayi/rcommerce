import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false ,showRemoveProductButton = false,
    setRun = f => f,
    run = undefined}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
const showViewButton = (showViewProductButton) => {
    return(
        showViewProductButton && (
            <Link to={`/product/${product._id}`}>
            <button  className="btn btn-info mr-2">View Product</button>
            </Link>
        )

    )
}

const addToCart = () => {
    addItem(product, () => {
        setRedirect(true)
    })
}

const shouldRedirect = redirect =>{
    if(redirect){
        return <Redirect to="/cart"/>
    }
}

const showAddToCart = (showAddToCartButton) => {
    return (
        showAddToCartButton && (
          <button onClick={addToCart}  className="btn btn-outline-info">
            Add to cart
          </button>
        )
      );
        }
const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };


  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-danger"
        >
          Remove Product
        </button>
      )
    );
  };
    return(
        
           <div className="card p-3">
  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    <ShowImage item={product} url="product" className="img-fluid prod-img"/>
   
      <div className="mask"></div>
   
  </div>
  <div className="card-body">
      {shouldRedirect(redirect)}
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text">{product.description}</p>
    <p className="black-9 text-info">₦ {product.price}</p>
     <p className="black-9">Category: {product.category && product.category.name}</p>

       <p className="black-8 text-success">Added  {moment(product.createdAt).fromNow()}</p>
       {showViewButton(showViewProductButton)}
                        {showAddToCart(showAddToCartButton)}
                        {showRemoveButton(showRemoveProductButton)}
                        {showCartUpdateOptions(cartUpdate)}
  </div>
</div>
        
    )
}


export default Card;


