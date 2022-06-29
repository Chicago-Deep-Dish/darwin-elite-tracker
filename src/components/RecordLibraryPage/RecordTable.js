import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function RecordTable({ tableData, setShowEditModal, setEditRow }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function handleEditClick(data, idx) {
    setEditRow({ data, idx })
    setShowEditModal(true);
  };

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function handleDelete(data) {
    // Junsu: Gil, this delete route works now, feel free to modify how data is sent
    // axios({
    //   method: 'delete',
    //   url: `/records`,
    //   data: data,
    // })
    //   .then(response => console.log(response));

    // Junsu: Gil, this is the edit/put route
    // axios({
    //   method: 'put',
    //   url: `/records`,
    //   data: data,
    // })
    //   .then(response => console.log(response));

    //Junsu: Gil, this is for search
    // axios.get('/records')
    //   .then(response => console.log(response.data._document.data.value.mapValue.fields));

    // Junsu: Gil, feel free to delete this or provide it to Jerry for his component
    axios({
      method: 'post',
      url: `/records`,
      data: data,
    })
      .then(response => console.log(response));
  }

  return (
    <TableContainer
      sx={{
        width: '80%',
        mb: 2,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Prompt Name</TableCell>
            <TableCell>Prompt Link</TableCell>
            <TableCell align="right">Difficulty</TableCell>
            <TableCell align="right">Time to Complete (mm:ss)</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tableData
          ).map((row, idx) => (
            <TableRow id={idx} key={idx}>
              <TableCell style={{ width: 160 }}>
                {row.promptName}
              </TableCell>
              <TableCell>
                <a href={row.promptLink} rel="noopener noreferrer" target="_blank" className="prompt-link">
                  {row.promptLink}
                </a>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.difficulty}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {millisToMinutesAndSeconds(row.totalTime)}
              </TableCell>
              <TableCell style={{ width: 72 }} align="right">
                <IconButton onClick={() => handleEditClick(row, idx)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell style={{ width: 73 }} align="right">
                <IconButton onClick={() => handleDelete(row)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer >
  );
}
