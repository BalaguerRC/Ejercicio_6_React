import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Task } from '../../models/task.class.js';
import { LEVELS } from '../../models/levels.enum.js';

const TaskComponent = ({ task,complete,deleteT }) => {
    useEffect(() => {
        console.log("created task")
        return () => {
            console.log(`task: ${task.name} is goint to unmount`)
        };
    }, [task]);

    function taskLevel() {
        switch (task.levels) {
            case LEVELS.NORMAL:
                return (
                    <h6 className='mb-0'>
                        <span className='badge bg-primary'>
                            {task.levels}
                        </span>
                    </h6>
                )

            case LEVELS.URGENT:
                return (
                    <h6 className='mb-0'>
                        <span className='badge bg-warning'>
                            {task.levels}
                        </span>
                    </h6>
                )
            case LEVELS.BLOCKING:
                return (
                    <h6 className='mb-0'>
                        <span className='badge bg-danger'>
                            {task.levels}
                        </span>
                    </h6>
                )
            default:
                return (
                    <h6 className='mb-0'>
                        <span className='badge bg-primary'>
                            {task.levels}
                        </span>
                    </h6>
                )
        }
    }
    function taskCompleted(){
        if(task.completed){
            return(
                <button onClick={()=>complete(task)} className='btn btn-primary task-action' style={{ background: 'green' }}>completa</button>
            )
        }
        else{
            return (<button onClick={()=>complete(task)} className='btn btn-primary task-action' style={{ background: 'grey' }}>incompleta</button>)
        }
    }
    return (

        <tr className='fw-normal'>
            <th scope='row'>
                <span className='ms-2'>{task.name}</span>
            </th>
            <td className='align-middle'>
                <span >{task.description}</span>
            </td>
            <td className='align-middle'>
                {taskLevel()}
            </td>
            <td className='align-middle'>
                {taskCompleted()}
                <button onClick={()=>deleteT(task)} className='btn btn-danger task-action' style={{ color: 'tomato', fontWeight: 'bold' }}>delete</button>
            </td>
        </tr>
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    complete: PropTypes.func.isRequired,
    deleteT:PropTypes.func.isRequired
};


export default TaskComponent;
