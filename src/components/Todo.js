import axios from "axios";
import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Todo({ fetchData }) {
  const classes = useStyles();
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState("");
  const getTodoData = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      console.log(data.data);
      setTask(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  console.log(task);

  return (
    <div className="App">
      <div className="container Todo">
        <h1>Roxiler</h1>
        <input
          type="search"
          placeholder="Search Here.."
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ToDo ID</StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {task
                .filter((item) => {
                  if (search === "") {
                    return item;
                  } else if (
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.id
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    (item.completed.toString() === "false"
                      ? "Incomplete"
                      : "Completed"
                    )
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        {item.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.completed.toString() === "false"
                          ? "Incomplete"
                          : "Completed"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <button
                          key={item.id}
                          className="fetch-button"
                          onClick={fetchData}
                        >
                          View User
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Todo;
