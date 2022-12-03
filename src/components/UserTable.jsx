import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchBar from "material-ui-search-bar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import {
	deleteUser,
	sortUsersInAsc,
	sortUsersInDesc,
} from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const columns = [
	{ id: "image", label: "Image", minWidth: 70 },
	{ id: "id", label: "ID", minWidth: 70 },
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 200 },
	{
		id: "contact",
		label: "Contact",
		minWidth: 170,
	},
	{
		id: "action",
		label: "Action",
		minWidth: 80,
		align: "center",
	},
];

export default function UserTable({ users }) {
	const dispatch = useDispatch();
	const rows = users;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [isAscending, setIsAscending] = React.useState(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "80%", overflow: "hidden" }}>
			<SearchBar
				placeholder="Search by name, email or contact"
				value={searchTerm}
				onChange={(newValue) => {
					setSearchTerm(newValue);
				}}
				style={{
					marginBottom: 10,
				}}
			/>
			<TableContainer sx={{ maxHeight: 440, minHeight: "70vh" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
									{column.id === "name" && (
										<Tooltip
											title={`Sort name in ${
												isAscending ? "ascending" : "descending"
											}`}
										>
											{isAscending ? (
												<IconButton
													onClick={() => {
														dispatch(sortUsersInAsc());
														setIsAscending((prev) => !prev);
													}}
												>
													<ArrowDownwardIcon fontSize="small" />
												</IconButton>
											) : (
												<IconButton
													onClick={() => {
														dispatch(sortUsersInDesc());
														setIsAscending((prev) => !prev);
													}}
												>
													<ArrowUpwardIcon fontSize="small" />
												</IconButton>
											)}
										</Tooltip>
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.filter(
								(user) =>
									user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
									user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
									user.contact.toLowerCase().includes(searchTerm.toLowerCase())
							)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										<TableCell>
											<Avatar alt="user" src={row.avatar} />
										</TableCell>
										<TableCell>{row.id}</TableCell>
										<TableCell align="left">{row.name}</TableCell>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.contact}</TableCell>
										<TableCell align="center">
											<Link to={`/${row.id}`}>
												<Button
													variant="contained"
													color="primary"
													aria-label="edit"
													size="small"
												>
													Edit
												</Button>
											</Link>
											&nbsp;
											<Button
												variant="contained"
												color="secondary"
												aria-label="delete"
												size="small"
												onClick={() => {
													dispatch(deleteUser(row.id)).then(() => {
														toast.success("User deleted successfully");
													});
												}}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
