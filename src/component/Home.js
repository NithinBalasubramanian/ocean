import React from 'react'
import style from '../styles/Content.module.css'

export default function Home() {
  return (
    <div className= { style.contentContainer }>
      <p>1. Create an Event Calendar with the Common holiday & Employee leave
      tracking.
      Note: Common Holidays will be updated by the admin / Employee leaves
      should be marked against the applied.</p>
      <p>
2. Create a form with Employee ID, Employee Name, Department, From Date
and To Date.</p>
      <p>3. After Selecting the Date, total number of days should be
automatically calculated from the applied date.
Note: No. Of Days should be calculated without common holidays(If any
common holidays falls in between the applied leaves means it should not
be calculated, ex : Saturday & Sunday), which we have previously
mentioned in the event calendar.</p>
      <p>4. After Submitting the leave request, Data should be saved against the
event calendar.</p>
      <p>5. Validation: If leaves applied already with the same date against the
same Emp ID means it should show an error message that you have been
applied already.</p>
    </div>
  )
}
