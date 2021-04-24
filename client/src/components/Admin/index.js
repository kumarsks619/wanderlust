import React, { useContext } from 'react'

import './Admin.css'
import Dashboard from './Dashboard'
import AdminLogin from './AdminLogin'
import { AdminContext } from '../../utils/Context/admin'

function Admin() {
    const adminContext = useContext(AdminContext)

    return (
        <div className="admin">
            { adminContext.admin ? <Dashboard /> : <AdminLogin /> }
        </div>
    )
}

export default Admin
