import React, { useEffect, useState, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import './AdminEnquiries.css'
import { deleteEnquiry } from '../../../../api/admin'
import { AdminContext } from '../../../../utils/Context/admin'
import ConfirmModal from '../../../../utils/Comp/ConfirmModal'

const columns = [
    { id: 'id', label: 'Enquiry ID', minWidth: 150 },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'email', label: 'Email Address', minWidth: 150 },
    { id: 'message', label: 'Message/Enquiry', minWidth: 250 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
]

function AdminEnquiries({ enquiriesData, setDeletedEnquiryID }) {
    const adminContext = useContext(AdminContext)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [rows, setRows] = useState([])
    const [deleteEnquiryConfirm, setDeleteEnquiryConfirm] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [deleteEnquiryID, setDeleteEnquiryID] = useState('')

    const handleChangePage = (_, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        setRows(
            enquiriesData.map((enquiry) => ({
                id: enquiry._id,
                name: enquiry.name,
                email: enquiry.email,
                message: enquiry.message,
            }))
        )
    }, [enquiriesData])

    // handling ENQUIRY delete *******************************************************************
    const handleDeleteEnquiry = async () => {
        try {
            let response = await deleteEnquiry(
                adminContext.admin.adminToken,
                deleteEnquiryID
            )
            setDeletedEnquiryID(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (deleteEnquiryConfirm) handleDeleteEnquiry()
    }, [deleteEnquiryConfirm])

    return (
        <>
            <Container>
                <Typography
                    variant="h4"
                    color="textSecondary"
                    gutterBottom={true}
                    className="adminEnquiries__header"
                >
                    Enquiries
                </Typography>
                <Divider light={true} className="adminEnquiries__divider" />
                <Paper className="adminEnquiries__paper">
                    <TableContainer className="adminEnquiries__tableContainer">
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{
                                                minWidth: column.minWidth,
                                                backgroundColor: '#ddd',
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                {columns
                                                    .filter(
                                                        (column) => column.id !== 'delete'
                                                    )
                                                    .map((column) => {
                                                        const value = row[column.id]
                                                        return (
                                                            <TableCell key={column.id}>
                                                                {value}
                                                            </TableCell>
                                                        )
                                                    })}
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => {
                                                            setDeleteEnquiryID(row['id'])
                                                            setIsOpen(true)
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[1, 2, 5]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>

            <ConfirmModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setConfirm={setDeleteEnquiryConfirm}
                content={
                    "Once deleted, then it can't be restored. Still sure to delete this Enquiry?"
                }
            />
        </>
    )
}

export default AdminEnquiries
