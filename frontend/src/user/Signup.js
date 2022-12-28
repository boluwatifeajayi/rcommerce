import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {signup} from '../auth'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }
            else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })

    }

    const signUpForm = () => (
        <div>




<section>

       
        
  
  <div class="px-4 py-5 px-md-5 text-center text-lg-start">
    <div class="container">
      <div class="row gx-lg-5 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <h4 class="my-5 display-4 fw-bold ls-tight">
         Create An <br />
            <span class="text-info">Account</span>
          </h4>
         
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card">
            <div class="card-body py-5 px-md-5">
            <form onSubmit={clickSubmit}>
                
               

                <div class="form-outline mb-4">
                  <input type="text" id="form3Example3" class="form-control" onChange={handleChange('name')} placeholder="your name" value={name} />
                </div>

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" onChange={handleChange('email')} placeholder="email ddress" value={email}/>
                
                </div>

               
                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4" onChange={handleChange('password')} placeholder="Password" value={password}   class="form-control" />
                 
                </div>

               
                <div class="form-check d-flex justify-content-center mb-4">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                  <label class="form-check-label" for="form2Example33">
                    Subscribe to our newsletter
                  </label>
                </div>

               
                <button type="submit" class="btn btn-info btn-block mb-4">
                  Sign up
                </button>

              
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>

        </div>
       
        
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account created, please <Link to="/signin">Sign In</Link>
        </div>
    )


    return(
        <Layout title=""
    description=""
    className="">
        {showSuccess()}
        {showError()}
        {signUpForm()}
    </Layout>
    )
}

export default Signup;