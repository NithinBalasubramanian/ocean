import React from 'react'

export default function ListEmployee({ data }) {
  return (
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Destination</th>
                </tr>
            </thead>
            <tbody>
                { data.length > 0 ?
                 data.map((itm,index) => {
                     return(
                        <tr key={ index }>
                            <td>{ index + 1 }</td>
                            <td>{ itm.name }</td>
                            <td>{ itm.email }</td>
                            <td>{ itm.destination }</td>
                        </tr>
                     )
                 }) : 
                 <tr>
                     <td colSpan={3} >No data found</td>
                </tr>}
            </tbody>
        </table>
    </div>
  )
}
