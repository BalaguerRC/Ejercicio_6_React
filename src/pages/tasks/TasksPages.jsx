import React from 'react';
import TaskListComponent from '../../components/TaskList';
import { Navigate } from 'react-router-dom';

const Taskspages = () => {

    let storage = JSON.parse(localStorage.getItem('User'))
    console.log('usuario : ', storage);
    
    const Task = () => {
        console.log('login es:', storage.state)
        return storage.state ? <TaskListComponent /> : <Navigate to='/login' />
    }

    return (
        <div>
            <Task />
        </div>
    );

}

export default Taskspages;
