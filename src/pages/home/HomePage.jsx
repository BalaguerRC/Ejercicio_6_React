import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const history= useNavigate();
    const navigate=(path)=>{
        history(path)
    }
    useEffect(() => {
        let storage = JSON.parse(localStorage.getItem('User'))
        console.log('user: ', storage)
    }, []);
    return (
        <div>
            <h2>Home page Test</h2>
            <button className='btn btn-primary' onClick={()=>navigate('/task')}>Tasks</button>
            <button className='btn btn-primary' onClick={()=>navigate('/login')}>login</button>
        </div>
    );
}

export default Homepage;
