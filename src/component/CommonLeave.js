import React , { useState , useEffect } from 'react'
import style from '../styles/Content.module.css'

import axios from 'axios'
import moment from "moment";

import ModalComponent from './ModalComponent';
import ListCommonLeave from './ListCommonLeave';

export default function CommonLeave() {

  let [ showDisp , setShowDisp ] = useState(false);
  let initialState = {
    title : '',
    date : '',
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

  let [ commonLeaveData , setCommonLeaveData ] =useState([])

  useEffect(() => {
    fetchData()
  },[])

  const onModal = () => {
    setShowDisp(!showDisp)
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

  const addCommonLeave = (e) => {
    e.preventDefault();

    if(data.title.trim() == '' && data.date.trim() == ''){
      return
    }

    axios.post('http://localhost:8000/leave/addCommonLeave',data)
      .then((response) => {
        if(response.data.status == 200){
          fetchData();
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

    axios.get('http://localhost:8000/leave/listLeave')
      .then((response) => {
        if(response.data.status == 200){
          setCommonLeaveData(response.data.data);
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
          Add Common leave
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
            <form onSubmit = { addCommonLeave } method="post">
              <div className='form-group'>
                <label>Title</label>
                <input className='form-control' placeholder='Enter your name' name="title" value={data.title} onChange = { changeData } />
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

        <ListCommonLeave data = { commonLeaveData } />
      </>
  )
}
