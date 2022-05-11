

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { DataTable, PropsTable } from '../interfaces';
import { Box } from '@mui/material';
import { useGetUserByIdQuery } from '../app/services/users';
import UpdateUserForm from './UpdateUser/UpdateUserForm';



const TableData: React.FC<PropsTable> = ({ data, columns }) => {
  let dispatch = useDispatch()

  // // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');
  const handleClose = () => {
    setShowModal(false)
  }

  const openDeleteModal = (id: string) => {
    console.log(id);

  }

  const handelAlertUpdateDialog = (id: string) => {
    console.log(id);
    setUserId(id)
    setShowModal(true)
    // setShowModal(true);
    // const { data, isLoading, error } = useGetUserByIdQuery(id);
    // setInitialUserData({ 
    //   id: data._id,
    //   fName: data.fName,
    //   lName: data.lName,
    //   cin: data.cin,
    //   balance: data.balance,
    //   email: data.email,
    //   phone: data.phone,
    //   accountNumber: data.accountNumber,
    //   PIN: data.PIN,
    //   ccn: data.ccn,
    // });


  }

  return (<>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} sx={{ width: `${columns.length / 100}` }} >
                          {column.id == "actions" ?
                            <Box>
                              <Button onClick={() => openDeleteModal(row._id)} variant="outlined" >
                                <DeleteIcon />
                              </Button>
                              <Button onClick={() => handelAlertUpdateDialog(row._id)} variant="outlined" >
                                <EditIcon />
                              </Button>
                            </Box> : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
     <UpdateUserForm showModal={showModal} handleClose={handleClose} id={userId} /> 
  </>
  );
};

export { TableData };