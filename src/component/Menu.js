import React from 'react'
import { NavLink } from "react-router-dom";
import style from '../styles/Menu.module.css'

export default function Menu() {
  return (
    <div className={ style.menuContent }>
        <NavLink to="/" className={({ isActive }) => isActive ? style.active : undefined}>
            Home
        </NavLink>
        <NavLink to="/Employee" className={({ isActive }) => isActive ? style.active : undefined}>
            Employee
        </NavLink>
        <NavLink to="/CommonLeave" className={({ isActive }) => isActive ? style.active : undefined}>
            Common leave
        </NavLink>
        <NavLink to="/LeaveForm" className={({ isActive }) => isActive ? style.active : undefined}>
            Apply leave
        </NavLink>
    </div>
  )
}
