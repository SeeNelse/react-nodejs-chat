import React from 'react';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = function(state) {
	return {
		chatHistory: state.chatHistory
	}
};

function ChatContainer(props) {
	componentDidMount() {
		this.refs['chat-window'].lastChild.scrollIntoView();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.chatHistory.length !== this.props.chatHistory) {
			this.refs['chat-window'].lastChild.scrollIntoView();
		}
	}

	return (
		<React.Fragment>
			<Container>
				<Row>
					<Col ref='chat-window' xs={12} className='chat-window'>
						{
							props.chatHistory.length ?
							props.chatHistory.map((el, index) => {
								return (
									<Message key={index} message={el}/>
								)
							}) :
							<Alert variant='danger'>No messages</Alert>
						}
					</Col>
				</Row>
			</Container>
			<MessageForm />
		</React.Fragment>
	)
}

ChatContainer.propTypes = {
	chatHistory: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(ChatContainer)