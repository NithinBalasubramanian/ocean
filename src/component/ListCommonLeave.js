import React from 'react'
import Moment from 'react-moment'

export default function ListCommonLeave({ data }) {
  return (
    <div>
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Leave date</th>
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ?
                    data.map((itm,index) => {
                        return(
                            <tr key={ index }>
                                <td>{ index + 1 }</td>
                                <td>{ itm.title }</td>
                                <td>
                                    <Moment format="DD MMM, YYYY">
                                        { itm.date }
                                    </Moment>
                                </td>
                            </tr>
                        )
                    }) : 
                    <tr>
                        <td colSpan={3} >No data found</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    </div>
  )
}

