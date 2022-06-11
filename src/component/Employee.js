import React , { useState , useEffect }  from 'react'
import style from '../styles/Content.module.css'

import axios from 'axios'

import ModalComponent from './ModalComponent';
import ListEmployee from './ListEmployee'


export default function Employee() {

  let [ showDisp , setShowDisp ] = useState(false);

  let initialState = {
    name : '',
    email : '',
    destination : ''
  }

  let [ data , setDate ] = useState(initialState)

  let messageData = {
    msg : '',
    type : ''
  }

  let [ message , setMessage ] = useState(messageData)
  
  const closeAlert = (time) => {
    setTimeout(() => {
      setMessage(messageData)
    },time)
  }

  const onModal = () => {
    setShowDisp(!showDisp)
  }

  let [ employeeData , setEmployeeData ] =useState([])

  useEffect(() => {
    fetchData()
  },[])

  const changeData = (e) =>{
    let { name , value } = e.target;

    setDate(prevState => {
      return {...prevState , [ name ] : value }
  })
  }

  const addEmployee = (e) => {
    e.preventDefault();

    if(data.name.trim() == '' && data.email.trim() == '' && data.destination.trim() == ''){
      return
    }

    axios.post('http://localhost:8000/employee/addEmployee',data)
      .then((response) => {
        if(response.data.status == 200){
          setMessage({
            msg : 'Data inserted successfully',
            type : 'success'
          })
          fetchData()
        }else{
          setMessage({
            msg : 'Something went wrong',
            type : 'error'
          })
        }
      })
      .catch((err) => {
        setMessage({
          msg : 'Something went wrong',
          type : 'error'
        })
      })
      onModal();
      closeAlert(3000)
  }

  const fetchData = () => {

    axios.get('http://localhost:8000/employee/listEmployee')
      .then((response) => {
        if(response.data.status == 200){
          setEmployeeData(response.data.data);
          setMessage({
            msg : 'Data fetched successfully',
            type : 'success'
          })
        }else{
          setMessage({
            msg : 'Something went wrong',
            type : 'error'
          })
        }
      })
      .catch((err) => {
        setMessage({
          msg : 'Something went wrong',
          type : 'error'
        })
      })
      closeAlert(3000)
  }

  return (
    <>
      <div className= { style.contentContainer }>
        <div className= { style.addButton }>
          <button className='btn btn-sm btn-success' onClick={ onModal }>
            Add Employee
          </button>
        </div>
        { message.msg != '' &&
          <div className= { message.type == 'success' ? 'alert-success' : 'alert-danger' }>
            { message.msg }
          </div>
        }
      </div>
      
    <ModalComponent  
      data={{
          show: showDisp,
          onHide: onModal,
          className: "custom_modal",
        }}>
          <div className= { style.formModal }>
            <form onSubmit = { addEmployee } method="post">
              <div className='form-group'>
                <label>Name</label>
                <input className='form-control' placeholder='Enter your name' name="name" value={data.name} onChange = { changeData } />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input className='form-control' placeholder='Enter your email' name="email" value={data.email} onChange = { changeData }  />
              </div>
              <div className='form-group'>
                <label>Department</label>
                <input className='form-control' placeholder='Enter your destination' name="destination" value={data.destination} onChange = { changeData }  />
              </div>
              <div className='form-group'>
                <button type="submit" className='btn btn-sm btn-success'>SAVE</button>
              </div>
            </form>
          </div>
        </ModalComponent>

        <ListEmployee data = { employeeData } />
    </>
  )
}
