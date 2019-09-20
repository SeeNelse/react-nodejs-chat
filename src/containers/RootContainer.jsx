import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import NavBarComponent from "./NavBarComponent";
import ChatContainer from "./ChatContainer";
import LoginFormContainer from './LoginFormContainer'
import PropTypes from "prop-types";
import * as actionCreators from "../actions/Actions";

const mapStateToProps = function(state) {
	return {
		isLogged: state.isLogged
	}
};

const mapDispatchToProps = function(dispatch) {
	return bindActionCreators({
		Login: actionCreators.Login
	}, dispatch)
};

function RootContainer(props) {
	useEffect(() => {
		if (sessionStorage.getItem('username')) {
			props.Login(sessionStorage.getItem('username'))
		}
	});
	
	return (
		<React.Fragment>
			{
				props.isLogged ?
					<React.Fragment>
						<NavBarComponent />
						<ChatContainer />
					</React.Fragment> :
					<LoginFormContainer />
			}
		</React.Fragment>
	)
}

RootContainer.propTypes = {
	isLogged: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)