import React, { useState, useEffect } from 'react';
// import './styles/App.css';
import { Container, Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadUsers = async () => {
    const res = await axios.get("http://jsonplaceholder.typicode.com/users");
    setUsers(res.data);
  }

  useEffect(() => {
    loadUsers()
  }, []);

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  }


  return (
    <Container className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Websites</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                  <TableCell>{user.website}</TableCell>
                  
                </TableRow>
              ))
            }

          </TableBody>
        </Table>
        <TablePagination 
        rowsPerPageOptions={[5, 10, 15, 25, 50]} 
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
      </TableContainer>

    </Container>
  );
}

export default App;
