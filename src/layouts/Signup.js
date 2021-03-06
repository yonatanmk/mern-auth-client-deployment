import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './Layout';
import Google from 'components/Google';
import Facebook from 'components/Facebook';

const Signup = observer(({ history, userStore: { signUp } }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { name, email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = user => {
    user.role === 'admin' ? history.push('/admin') : history.push('/profile');
  };

  const clickSubmit = async event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });

    try {
      const message = await signUp({ name, email, password })
      console.log('SIGNUP SUCCESS', message);
      setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
      toast.success(message);
    } catch(err) {
      const { message } = err;
      console.log('SIGNUP ERROR', message);
      setValues({ ...values, buttonText: 'Submit' });
      toast.error(message);
    }
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} value={password} type="password" className="form-control" autoComplete="off"/>
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">Sign Up</h1>
        <Google text="Sign Up with Google" informParent={informParent} />
        <Facebook text="Sign Up with Facebook" informParent={informParent} />
        {signupForm()}
        <br />
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
          Forgot Password
        </Link>
      </div>
    </Layout>
  );
});

export default inject('userStore')(Signup);