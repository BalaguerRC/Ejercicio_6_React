import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link,useNavigate } from 'react-router-dom';

const Registerformik = () => {
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
        history('/login')
    }
    return (
        <div className='Loginform '>
            <div className='LoginContainer'>

                <div className='buttonBack col-12 '>
                    <button className='buttonBackbutton btn' onClick={()=>navigate('/login')}>{'<---'}</button>
                    <h3>Sign in</h3>
                </div>
                
                <Formik
                    initialValues={initialValues}
                    onSubmit={async values => {
                        await new Promise((r) => setTimeout(r, 1000));
                        values.state = true;
                        localStorage.setItem('User', JSON.stringify(values))
                        let storage = JSON.parse(localStorage.getItem('User'))
                        console.log('Este es ', storage);
                        TaskNew();
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
                            <Link to='/login'>login</Link>
                            <div className='buttonTask col-12'>
                                <button type="submit" className='btn btn-primary' >Sign in</button>
                            </div>
                            {isSubmitting ? (<p>sign in...</p>) : null}

                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    );
}

export default Registerformik;
