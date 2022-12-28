import React, { Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth';
import {addItem, itemTotal} from './cartHelpers';
 
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#333" };
    } else {
        return { color: "#333" };
    }
}


    


const Menu = ({history}) => (<div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

<div className="container">

<a className="navbar-brand me-2">
 E-SHOPY
</a>


<button
  className="navbar-toggler"
  type="button"
  data-mdb-toggle="collapse"
  data-mdb-target="#navbarButtonsExample"
  aria-controls="navbarButtonsExample"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <i className="fas fa-bars"></i>
</button>


<div class="collapse navbar-collapse" id="navbarButtonsExample">
 
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
   <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
        </li>
        
        
        <li className="nav-item">
            <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
            >
                Shop
            </Link>
        </li>
  </ul>
  

  <div class="d-flex align-items-center">
    <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
            >
                Cart{" "}
                <sup>
                    <small className="cart-badge">{itemTotal()}</small>
                </sup>
            </Link>

             {isAuthenticated() && isAuthenticated().user.role === 1 && (
            
                <Link
                    className="nav-link"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                >
                    Dashboard
                </Link>
            
        )}
    {!isAuthenticated() && (
            <Fragment>
                
                    <Link
                        className="nav-link"
                        style={isActive(history, "/signin")}
                        to="/signin"
                    >
                        <button className="btn btn-link px-3 me-2">
                            login
                        </button>
                        
                    </Link>
               

                
                    <Link
                        className="nav-link"
                        style={isActive(history, "/signup")}
                        to="/signup"
                    >
                        <button className='btn btn-info me-3'>
                             Sign Up
                        </button>
                    </Link>
                
            </Fragment>
        )}
        
        {isAuthenticated() && (
            
                <span
                    className="nav-link"
                    
                    onClick={() =>
                        signout(() => {
                            history.push("/");
                        })
                    }
                >
                    Signout
                </span>
            
        )}

   
  </div>
</div>


</div>

</nav>
</div>
) 


export default withRouter(Menu);




