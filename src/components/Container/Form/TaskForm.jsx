import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { LEVELS } from '../../../models/levels.enum';
import { Task } from '../../../models/task.class';
import { useNavigate } from 'react-router-dom';


const TaskForm = ({ add, length }) => {

    TaskForm.protoTypes = {
        add: PropTypes.func.isRequired,
        length: PropTypes.number.isRequired
    }
    const initialValues = {
        name: '',
        description: '',
        levels: LEVELS.NORMAL,
        state: false,
    }
    function addTask(values) {
        const newTask = new Task(
            values.name,
            values.description,
            values.levels,
            values.state
        )
        //console.log(newTask)
        add(newTask);
    }
    const taskSchema = Yup.object().shape(
        {
            name: Yup.string().min(6, 'username to short').max(12, 'username to long').required('User name is required'),
            description: Yup.string().min(6, 'description to short').max(25, 'description to long').required('Description is required')/*,
            levels: Yup.string().oneOf([LEVELS.NORMAL, LEVELS.URGENT, LEVELS.BLOCKING], 'You must select a level: normal, urgent or blocking').required('Level is required')*/
        })
    const history = useNavigate();
    const navigate = (path) => {
        const values = {
            email: '',
            password: '',
            state: false,
        }
        localStorage.setItem('User', JSON.stringify(values))
        history(path);
    }
    return (
        <div className=''>
            <h3 className='card-title'>Create a Task</h3>
            <button className='btn btn-danger' onClick={()=>navigate('/')}>Logout</button>
            <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                    await new Promise((r) => setTimeout(r, 1000));
                    //console.log(values);
                    addTask(values)
                }}
                validationSchema={taskSchema}
            >
                {({ values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                    <Form className='row g-3 mb-3 needs-validation formTask' noValidate>
                        <div className='col-md-4'>
                            <label htmlFor="name" className='form-label'>Name</label>
                            <Field id="name" type="text" name="name" placeholder="Task name" className='form-control' />
                            {errors.name && touched.name && (
                                <ErrorMessage name='name' component='div' style={{ color: 'tomato' }}></ErrorMessage>
                            )}
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="description" className='form-label'>Description</label>
                            <Field id="description" type="name" name="description" placeholder="description" className='form-control' />
                            {errors.description && touched.description && (
                                <ErrorMessage name='description' component='div' style={{ color: 'tomato' }}></ErrorMessage>
                            )}
                        </div>
                        <div className='col-md-3'>
                            <label className='form-label'>Select a Level</label>
                            <Field name="levels" as="select" defaultValue={LEVELS.NORMAL} className='form-select'>
                                <option value={LEVELS.NORMAL}>Normal</option>
                                <option value={LEVELS.URGENT}>Urgent</option>
                                <option value={LEVELS.BLOCKING}>Blocking</option>
                            </Field>
                            {errors.levels && touched.levels && (
                                <ErrorMessage name='levels' component='div' style={{ color: 'tomato' }}></ErrorMessage>
                            )}
                        </div>
                        <div className='buttonTask col-12'>
                            <button type="submit" className='btn btn-primary'>Create a task</button>
                        </div>
                        {isSubmitting ? (<p>creating your task...</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default TaskForm;
