import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const axios = require("axios");

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

function UserData() {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const URL = "https://jsonplaceholder.typicode.com/users/1";

  const fetchData = async () => {
    const response = await axios.get(URL);
    const data = JSON.stringify(
      [response.data.id, response.data.name, response.data.email],
      null
    );

    setUser(data);
  };
  var array = user.split(",");
  return (
    <div className="userTable">
      <button className="fetch-button" onClick={fetchData}>
        Fetch Data
      </button>
      {/* <pre>{user}</pre>
      <p>{array[1]}</p> */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          {/* <TableRow>
            <StyledTableCell>ToDo ID</StyledTableCell>
            <StyledTableCell align="left">{array[0]}</StyledTableCell>
            <StyledTableCell align="left">{array[1]}</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
          </TableRow>
          <TableBody>
            <StyledTableRow key={1}>
              <StyledTableCell scope="row">ToDo Title</StyledTableCell>
              <StyledTableCell align="left">User Id</StyledTableCell>
              <StyledTableCell align="left">{array[2]}</StyledTableCell>
            </StyledTableRow>
          </TableBody> */}
          <TableBody>
            <TableRow>
              <StyledTableCell variant="head" align="left">
                ToDo ID
              </StyledTableCell>
              <StyledTableCell align="left">{array[0]}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell variant="head" align="left">
                ToDo Title
              </StyledTableCell>
              <StyledTableCell align="left">{array[0]}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell variant="head" align="left">
                User Id
              </StyledTableCell>
              <StyledTableCell align="left">{array[0]}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell variant="head" align="left">
                Name
              </StyledTableCell>
              <StyledTableCell align="left">{array[1]}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell variant="head" align="left">
                Email
              </StyledTableCell>
              <StyledTableCell align="left">{array[2]}</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserData;
