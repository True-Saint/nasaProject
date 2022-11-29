import React from 'react';

const LoginComponent =  (props) => {
    return (
        <div>
            <form className="form-signin form-group" action="{{ path('auth_login_check') }}" method="post" encType="">
                Username: <input type="text" className="form-control" name="_username" placeholder="Username" value="" required="required"></input>
                Password: <input type="text" className="form-control" name="_password" placeholder="" value="" required="required"></input>
                <button className="btn btn-sm btn-primary btn-block" type="submit">Sign in</button>
            </form>
        </div>


    )
};

export default LoginComponent;

