import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import style from '../styles/App.module.css'

import Home from './Home'
import Employee from './Employee';
import Menu from './Menu'
import LeaveForm from './LeaveForm';
import CommonLeave from './CommonLeave';

export default function main() {
  return (
    <div className={ style.Content }>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/CommonLeave" element={<CommonLeave />} />
          <Route path="/LeaveForm" element={<LeaveForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
