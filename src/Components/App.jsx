import { React, useEffect, useState } from 'react';
import axios from 'axios';

import {
	CssBaseline,
	AppBar,
	Box,
	Toolbar,
	Typography,
	makeStyles,
	Container,
	Modal,
	Button,
	TextField,
} from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		height: '100vh',
	},
	flexy: {
		display: "flex",
		flexDirection: "row",
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center"
	},
	flex1: {
		width: "500px",
		bordeRight: "1px solid black",
		textAlign: "center",
		padding: '2px',
		margin: "2px",
		minHeight: "200%",
	},
	flex2: {
		width: "500px",
		borderLeft: "1px solid black",
		textAlign: "center",
		padding: '2px',
		margin: "2px",
	},
	addExpenseModal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		border: '2px solid #000',
		borderRadius: '10px',
		background: 'linear-gradient(45deg, lightyellow, lightblue)',
		textAlign: 'center',
		boxShadow: 24,
		p: 4,
		padding: '5px',
	},
	addIncomeModal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		border: '2px solid #000',
		borderRadius: '10px',
		background: 'linear-gradient(45deg, lightyellow, lightblue)',
		textAlign: 'center',
		boxShadow: 24,
		p: 4,
		padding: '5px',
	},
	giveSpace: {
		margin: '14px 4px',
		width: '100%'
	}
})

function App() {
	const [income, setIncome] = useState('');
	const [expense, setExpense] = useState('');
	const [expOpen, setExpOpen] = useState(false);
	const [incOpen, setIncOpen] = useState(false);
	const [timeValue, setTimeValue] = useState(new Date());
	const handleExpOpen = () => setExpOpen(true);
	const handleExpClose = () => setExpOpen(false);
	const handleIncOpen = () => setIncOpen(true);
	const handleIncClose = () => setIncOpen(false);
	const handleTimeChange = (newValue) => {
		setTimeValue(newValue);
	};
	const handleAddIncome = () => {
		axios.post('http://localhost:5000/addIncome', {})
		.then(res => setIncome(res.data))
		.catch(err => console.log(err))
	}


	useEffect(() => {
		axios.post('http://localhost:5000/getincome/', { "user_id": "61878e645c861a6a7686fa18" })
			.then(res => {
				setIncome(res.data)
				console.log(res.data)
			})
			.catch(err => console.log(err))

		axios.post('http://localhost:5000/getexpense/', { "user_id": "61878e645c861a6a7686fa18" })
			.then(res => {
				setExpense(res.data)
				console.log(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Box>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							Digital Accountant
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Container className={classes.flexy}>
				<div className={classes.flex1}>
					<Button color='primary' variant='contained' onClick={handleIncOpen}>Add</Button>
					{
						income
							?
							(income.map(inclog => {
								return (
									<div key={inclog._id}>
										<h2>
											{inclog.amt}
										</h2>
										<h3>
											{inclog.title}
										</h3>
										<p>
											{inclog.notes}
										</p>
										<small>
											{(inclog.time).substring(0, 10)}
											&nbsp;
											{(inclog.time).substring(11, 20)}
										</small>
										<hr />
									</div>
								)
							}))
							:
							"loading"
					}
				</div>
				<div className={classes.flex2}>
					<Button color='secondary' variant='contained' onClick={handleExpOpen}>Add</Button>
					{
						expense
							?
							(expense.map(explog => {
								return (
									<div key={explog._id}>
										<h2>
											{explog.amt}
										</h2>
										<h3>
											{explog.title}
										</h3>
										<p>
											{explog.notes}
										</p>
										<small>
											{(explog.time).substring(0, 10)}
											&nbsp;
											{(explog.time).substring(11, 20)}
										</small>
										<hr />
									</div>
									
								)
							}))
							:
							"loading"
					}
				</div>
			</Container>

			{/* Add income modal box */}
			<Modal
				open={incOpen}
				onClose={handleIncClose}
				aria-labelledby="addincome"
				aria-describedby="add-income-here"
			>
				<Box className={classes.addIncomeModal}>
					<Typography id="addincome" variant="h6" component="h2">
						Add Income
					</Typography>

					<div className={classes.giveSpace}>
						<TextField id="outlined-basic" label="Title" variant="outlined" />
					</div>
					<div className={classes.giveSpace}>
						<TextField id="outlined-basic" label="Amount Earned" variant="outlined" required inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
					</div>
					<div className={classes.giveSpace}>
						<TextField id="outlined-basic" label="Notes" variant="outlined" />
					</div>
					<div className={classes.giveSpace}>
						<TextField
							id="income-datetime-local"
							label="Time of Earning"
							variant="outlined"
							type="datetime-local"
							defaultValue="2017-05-24T10:30"
						/>
					</div>

					<Button color='primary' variant='contained' onClick={handleAddIncome}>
						Submit
					</Button>
				</Box>
			</Modal>

			{/* Add Expense modal box */}
			<Modal
				open={expOpen}
				onClose={handleExpClose}
				aria-labelledby="addexpense"
				aria-describedby="add-expense-here"
			>
				<Box className={classes.addExpenseModal}>
					<Typography id="addexpense" variant="h6" component="h2">
						Add Expense
					</Typography>

					<div className={classes.giveSpace}>
						<TextField id="outlined-basic" label="Title" variant="outlined" />
					</div>
					<div className={classes.giveSpace}>
						<TextField id="outlined-basic" label="Amount Spent" variant="outlined" required inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
					</div>
					<div className={classes.giveSpace}>
						<TextField id="outlined-basic" label="Notes" variant="outlined" />
					</div>
					<div className={classes.giveSpace}>
						<TextField
							id="datetime-local"
							label="Time of Expenditure"
							variant="outlined"
							type="datetime-local"
							defaultValue="2017-05-24T10:30"
						/>
					</div>

					<Button color='Secondary' variant='contained'>
						Submit
					</Button>
				</Box>
			</Modal>

		</div>
	);
}

export default App;
