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
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
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

function Todo({ fetchData, getTaskId, getTaskTitle }) {
  const classes = useStyles();
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("ids");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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

  //const totalrows = task.length;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = [rowArray].map((el, index) => [el, index]);
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
  };

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // function clickMe(item) {
  //   console.log(item.id);
  // }

  // const handler = (id) => (e) => {
  //   var currentId = id;
  //   console.log(currentId);
  // };

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
                <StyledTableCell>
                  <TableSortLabel
                    active={valueToOrderBy === "ids"}
                    direction={
                      valueToOrderBy === "ids" ? orderDirection : "asc"
                    }
                    onClick={createSortHandler("ids")}
                  >
                    ToDo ID
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            {sortedRowInformation(
              task,
              getComparator(orderDirection, valueToOrderBy)
            ).map((item, index) => (
              <TableBody>
                {task
                  // eslint-disable-next-line array-callback-return
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, id) => {
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
                            key={id}
                            className="fetch-button"
                            //onClick={fetchData}
                            onClick={() => {
                              fetchData();
                              getTaskId(item.id);
                              getTaskTitle(item.title);
                            }}
                          >
                            View User
                          </button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            ))}
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={200}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default Todo;
