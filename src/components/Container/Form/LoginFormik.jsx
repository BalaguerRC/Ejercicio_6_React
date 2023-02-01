import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const Loginformik = () => {
    const initialValues = {
        email: '',
        password: '',
        state: false,
    }
    const userSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    })
    const history= useNavigate();

    const navigate=(path)=>{
        history(path);
    }
    const TaskNew=()=>{
        history('/task')
    }
    return (
        <div className='Loginform '>
            <div className='LoginContainer'>

                <div className='buttonBack col-12 '>
                    <button className='buttonBackbutton btn' onClick={()=>navigate('/home')}>{'<---'}</button>
                    <h3>Login</h3>
                </div>
                
                <Formik
                    initialValues={initialValues}
                    onSubmit={async values => {
                        await new Promise((r) => setTimeout(r, 1000));
                        let storage = JSON.parse(localStorage.getItem('User'))
                        //console.log('Este es ', storage);
                        if(storage.email===values.email || storage.password===values.password){
                            TaskNew();
                        }
                        else{
                            alert('Account does not exist', 'Alert');
                        }
                        //navigate('/task');
                    }}
                    validationSchema={userSchema}>
                    {({ values, touched, errors, isSubmitting, hadleChange, handleBlur }) => (
                        <Form className='row g-3 mb-3 needs-validation' noValidate>
                            <div className=''>
                                <label htmlFor='email' className='form-label'>Email</label>
                                <Field className='form-control' id='email' type='email' name='email' placeholder="youremail@gmail.com" />
                                {errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div' style={{ color: 'tomato' }}></ErrorMessage>
                                )}
                            </div>
                            <div className=''>
                                <label htmlFor='password' className='form-label'>Password</label>
                                <Field className='form-control' id='password' type='password' name='password' placeholder="your password" />
                                {errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div' style={{ color: 'tomato' }}></ErrorMessage>
                                )}
                            </div>
                            <div>
                                <Link to='/register'>sign in</Link>
                            </div>
                            <div className='buttonTask col-12'>
                                <button type="submit" className='btn btn-primary' >Log in</button>
                            </div>
                            {isSubmitting ? (<p>Log-in...</p>) : null}

                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    );
}

export default Loginformik;
