import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// const axios = require("axios");

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

function UserData({ array }) {
  const classes = useStyles();
  return (
    <div className="userTable">
      {/* <pre>{user}</pre>
      <p>{array[1]}</p> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
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
