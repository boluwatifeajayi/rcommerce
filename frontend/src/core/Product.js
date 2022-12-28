import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return(
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="product-style container mt-4">

            
            <div className="row">
                <div className="col-6">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>
                
                <div className="col-6">
                <div className="card">
                <div className="card-header name">
                    <h5>Product Details</h5>
                </div>
                <div className="card-body">
                <h6>Product Location: {product.location}</h6>
               
                <h6>Owners Social Handle: {product.instagram_handle}</h6>
                <h6>Sellers Phone number: {product.telegram_no}</h6>
                <h6>Sellers Email: {product.email_address}</h6>
                
                </div>
                
                </div>

                </div>

                
                    <h4 className="mb-4 mt-4">Related products</h4>
                    <div className="row">
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3 related-product col-sm-4" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                    </div>
               
            

            </div>
            </div>
        </Layout>
    )
}

export default Product;