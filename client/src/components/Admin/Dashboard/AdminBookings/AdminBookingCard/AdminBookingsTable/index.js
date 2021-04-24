import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'


const columns = [
    { field: 'id', headerName: 'Booking ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 220 },
    { field: 'email', headerName: 'Email Address', width: 220 },
    { field: 'contact', headerName: 'Contact', width: 150 },
    { field: 'persons', headerName: 'Persons', width: 130 }
]

const AdminBookingsTable = ({ rows }) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    )
}


export default AdminBookingsTable