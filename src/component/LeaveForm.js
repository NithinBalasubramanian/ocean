import React , { useState , useEffect }  from 'react'
import style from '../styles/Content.module.css'

import axios from 'axios'
import moment from "moment";

import ModalComponent from './ModalComponent';

export default function LeaveForm() {
  
  let [ showDisp , setShowDisp ] = useState(false);

  let initialState = {
    employeeId : '',
    date : ''
  }

  let messageData = {
    msg : '',
    type : ''
  }

  let [ message , setMessage ] = useState(messageData)

  let [ data , setDate ] = useState(initialState)

  const onModal = () => {
    setShowDisp(!showDisp)
  }

  let [ employeeData , setEmployeeData ] =useState([])

  useEffect(() => {
    fetchData()
  },[])

  const closeAlert = (time) => {
    setTimeout(() => {
      setMessage(messageData)
    },time)
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
          msg : `Something went wrong , ${err}`,
          type : 'error'
        })
      })
      closeAlert(3000)
  }

  const changeData = (e) =>{
    let { name , value } = e.target;

    if(name == 'date'){
      var day = new Date(value).getUTCDay();
      if([6,0].includes(day)){
        alert('Week end days are not allowed to select');
        return;
      } 
    }

    setDate(prevState => {
      return {...prevState , [ name ] : value }
  })
  }

  const addLeave = (e) => {
    e.preventDefault()

    if(data.employeeId == '' && data.date.trim() == ''){
      return
    }

    axios.post('http://localhost:8000/employeeleave/applyLeave',data)
      .then((response) => {
        if(response.data.status == 200){
          setMessage({
            msg : 'Data inserted successfully',
            type : 'success'
          })
        }else if(response.data.status == 400){ 
          setMessage({
            msg : response.data.msg,
            type : 'error'
          })
        }else{
          setMessage({
            msg : `Something went wrong`,
            type : 'error'
          })
        }
      })
      .catch((err) => {
        setMessage({
          msg : `Something went wrong , ${err}`,
          type : 'error'
        })
      })

      setDate(initialState)
      onModal()
      closeAlert(3000)
  }


  return (
    <>
      <div className= { style.contentContainer }>
        <div className= { style.addButton }>
          <button className='btn btn-sm btn-success' onClick={ onModal }>
            Apply leave
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
            <form onSubmit = { addLeave } method="post">
                <div className='form-group'>
                  <label>Employee</label>
                  <select className='form-control' name="employeeId"  onChange = { changeData }  value={ data.employeeId }>
                    <option>Select employee</option>
                    { employeeData.map((itm) => (
                      <option value={ itm._id }>{ itm.name }</option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Date</label>
                  <input className='form-control' min={moment(new Date()).format("YYYY-MM-DD")} type="date" name="date" value={data.date} onChange = { changeData }  />
                </div>
                <div className='form-group'>
                  <button type="submit" className='btn btn-sm btn-success'>SAVE</button>
                </div>
              </form>
            </div>
          </ModalComponent>
      </>
  )
}
