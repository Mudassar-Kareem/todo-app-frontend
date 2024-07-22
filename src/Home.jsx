import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
const Home = () => {
  const [todo,setTodo] =useState([]);
  const [task,setTask] =useState([]);
  useEffect(()=>{
    axios.get("https://todo-app-server-wine.vercel.app/get")
    .then(result =>setTodo(result.data))
    .catch(err =>(console.log(err)));
  })
  const editHandle =(id) =>{
    axios.put("https://todo-app-server-wine.vercel.app/update/" +id)
    .then(result=>{location.reload()})
    .catch(err =>(console.log(err)));
  }
  const deleteHandle =(id) =>{
    axios.delete("https://todo-app-server-wine.vercel.app/delete/" +id)
    .then(result=>{location.reload()})
    .catch(err =>(console.log(err)));
  }
  const addButtonHandler = ()=>{
    axios.post("https://todo-app-server-wine.vercel.app/add", {task: task})
    .then(result=>{location.reload()})
    .catch(err =>(console.log(err)));
  };
  return (
    <div className='main'>
        <h1 style={{fontStyle: "italic"}}>Todo List📝</h1>
        <form className='form'>
            <input type="text" placeholder='Add your task' onChange={(e)=>setTask(e.target.value)} />
            <button onClick={addButtonHandler}> <CiCirclePlus className='icon' size={31}/> </button>
        </form>
        {todo.length === 0 ? <div style={{textAlign: "center"}}><h4>No item added </h4></div> : 
        todo.map(to =>(
        <div className="task">
          <div className="mes" onClick={()=> editHandle(to._id)}>
          {to.done  ? <FaRegCheckCircle size={20} /> :<FaRegCircle size={20}/> }
          <p className={to.done  ? 'line' : ''}> {to.task}</p>
          </div>
          <span >
           <MdDelete onClick={()=>deleteHandle(to._id)} style={{color: "red" }} size={20} /> 
          </span>
        </div>
        ))
        }
    </div>
  )
}

export default Home
