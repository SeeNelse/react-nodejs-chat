import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Navbar, Nav, Row, Col, Container, NavDropdown} from 'react-bootstrap';
import * as actionCreators from "../actions/Actions";
import PropTypes from "prop-types";


const mapStateToProps = function(state) {
	return {
		userName: state.userName
	}
};

const mapDispatchToProps = function(dispatch) {
	return bindActionCreators({
		Logout: actionCreators.Logout
	}, dispatch)
};

function NavBarComponent(props) {
	const handleLogout = () => {
		sessionStorage.setItem('username', '');
		props.Logout();
	}

	return (
		<Container>
			<Row>
				<Col xs={12} className="">
					<Navbar bg="dark" variant="dark" className='mb-3 d-flex align-items-center justify-content-between'>
						<Navbar.Brand href="#home">React chat</Navbar.Brand>
						<Nav>
							<NavDropdown className='text-white' title={`Hello, ${props.userName}!`} id="collasible-nav-dropdown">
								<NavDropdown.Item onClick={handleLogout} >Logout</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar>
				</Col>
			</Row>
		</Container>
	)
}

NavBarComponent.propTypes = {
	userName: PropTypes.string.isRequired,
	Logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent)