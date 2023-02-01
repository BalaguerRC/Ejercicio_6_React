//import logo from './logo.svg';
import './App.css';
//import TaskForm from './components/Container/Form/TaskForm';
//import TaskListComponent from './components/TaskList';
import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Notfound from './pages/404/NotFound';
import Homepage from './pages/home/HomePage';
import Taskspages from './pages/tasks/TasksPages';
import Loginpage from './pages/auth/LoginPage';
import Registerpage from './pages/auth/RegisterPage';

function App() {

  let storage = JSON.parse(localStorage.getItem('User'))
  console.log('usuario desde app: ', storage);

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route path='/home' element={<Homepage />} />
      <Route exact path='/task' element={<Taskspages />} />
      <Route path='/login' element={<Loginpage />} />
      <Route path='/register' element={<Registerpage />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  );
}

export default App;
