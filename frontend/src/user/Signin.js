import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {signin, authenticate, isAuthenticated} from '../auth'

const Signin = () => {
    const [values, setValues] = useState({
        
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToRefferer: false
    })

    const {email, password, loading, error, redirectToRefferer} = values
    const {user} = isAuthenticated() 

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }
            else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToRefferer: true
                    })
                })
            }
        })

    }

    const signUpForm = () => (
        <section>

       
        
  
        <div class="px-4 py-5 px-md-5 text-center text-lg-start">
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <h4 class="my-5 display-4 fw-bold ls-tight">
               Log Into <br />
                  <span class="text-info">Your Account</span>
                </h4>
               
              </div>
      
              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="card">
                  <div class="card-body py-5 px-md-5">
                  <form onSubmit={clickSubmit}>
                      
                     
      
                      <div class="form-outline mb-4">
                        <input type="email" id="form3Example3" class="form-control" onChange={handleChange('email')} placeholder="email ddress" value={email}/>
                      
                      </div>
      
                     
                      <div class="form-outline mb-4">
                        <input type="password" id="form3Example4" onChange={handleChange('password')} placeholder="Password" value={password}   class="form-control" />
                       
                      </div>
      
                     
                    
                     
                      <button type="submit" class="btn btn-info btn-block mb-4">
                        Sign In
                      </button>
      
                    
                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const redirectUser = () => {
        if (redirectToRefferer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    
    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );


    return(
        <Layout title="Signin"
    description="sign in to ecommerce"
    className="container col-md-8 offset-md-2">
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
    </Layout>
    )
}

export default Signin;