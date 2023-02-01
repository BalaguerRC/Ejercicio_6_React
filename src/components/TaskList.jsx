import React, { useState, useEffect } from 'react';
import { Task } from '../models/task.class.js';
import { LEVELS } from '../models/levels.enum.js';
import TaskComponent from './Container/Task';
import TaskForm from './Container/Form/TaskForm';

const TaskListComponent = () => {
    const defaultTask = new Task('Example', 'Default descripcion', LEVELS.NORMAL, false);
    const defaultTask2 = new Task('Example2', 'Default descripcion2', LEVELS.URGENT, true);
    const defaultTask3 = new Task('Example3', 'Default descripcion3', LEVELS.BLOCKING, false);


    //estado del componente
    const [tasks, setTasks] = useState([defaultTask, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);
    //control de ciclo de vida del componente

    useEffect(() => {
        console.log('Task state has been modified')
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => {
            console.log('tasklist component is going to unmount')
        };
    }, [tasks]);

    function clompleteTask(task) {
        console.log('Complete this task ', task);
        const index = tasks.indexOf(task);
        const tempTask = [...tasks];
        tempTask[index].completed = !tempTask[index].completed;
        //we update the state of the component with the new tasks and it will update the 
        //iteraction of the task in order to show the task updated

        setTasks(tempTask);
    }

    function deleteTask(task) {
        console.log('delete this task ', task);
        const index = tasks.indexOf(task);
        const tempTask = [...tasks];
        tempTask.splice(index, 1);
        setTasks(tempTask);
    }

    function addTask(task) {
        //console.log(task)
        console.log('Add this task ', task);
        const tempTask = [...tasks];
        tempTask.push(task);
        setTasks(tempTask);
    }

    const Table = () => {
        return (
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>Tittle</th>
                        <th scope='col'>Descripcion</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* for or map to list*/}
                    {tasks.map((task, index) => {
                        return (
                            <TaskComponent key={index} task={task} complete={clompleteTask} deleteT={deleteTask}></TaskComponent>
                        )
                    })}

                </tbody>
            </table>
        );
    }
    let tasksTable;

    if (tasks.length > 0) {
        tasksTable = <Table></Table>
    }
    else {
        tasksTable = <h3>There are no tasks to show</h3>
    }

    return (
        <div className='formTask'>
            <TaskForm add={addTask} length={tasks.length}></TaskForm>
            <div className='col-12'>
                <div>
                    <div className='card-header p-3'>
                        <h5>Your tasks: </h5>

                    </div>
                </div>
                <div className='card-body' data-mdb-perfect-scrollbar='true' style={{ position: 'relative', height: '400px' }}>
                    {/**add loading spinner */}
                    {loading ? (<p>Loading...</p>) : tasksTable}
                </div>

            </div>
        </div>
    );
}

export default TaskListComponent;
