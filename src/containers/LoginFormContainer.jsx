import React, {useState} from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import * as actionCreators from '../actions/Actions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

const mapDispatchToProps = function(dispatch) {
	return bindActionCreators({
		Login: actionCreators.Login
	}, dispatch)
};

function LoginFormContainer(props) {
	const [error, setError] = useState(false);

	const enterToChat = (event) => {
		event.preventDefault();
		let inputValue = event.target.username.value;
		if (validate(inputValue)) {
			props.Login(inputValue);
			sessionStorage.setItem('username', inputValue);
		}
	};
	
	const validate = (username) => {
		if (username.length < 4 || username.length > 15) {
			setError(true);
			return false;
		} else {
			return true;
		}
	}

	return (
		<Modal.Dialog>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			
			<Modal.Body>
				<Form onSubmit={enterToChat}>
					<Form.Control required name="username" type="text" placeholder="Username" className='mb-2' />
					<Button variant="primary" type="submit">Enter</Button>
				</Form>
				{
					error &&
					<Alert variant='danger' className='mt-2'>
						Minimum 4 symbols, maximum 15
					</Alert>
				}
			</Modal.Body>

		</Modal.Dialog>
	)
}

LoginFormContainer.propTypes = {
	Login: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(LoginFormContainer)