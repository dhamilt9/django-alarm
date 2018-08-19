import React from 'react';
import PropTypes from 'prop-types';

const AlarmForm = props => (
	<form onSubmit={props.submitComment}>
		<input
			type="text"
			name="vidname"
			placeholder="Your name..."
			value={props.vidname}
			onChange={props.handleChangeText}
		/>
		<input
			type="text"
			name="reason"
			placeholder="Reason for wakeup..."
			value={props.reason}
			onChange={props.handleChangeText}
		/>
		<button type="submit">Wake Up</button>
	</form>
);

AlarmForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  vidname: PropTypes.string,
  reason: PropTypes.string,
};

AlarmForm.defaultProps = {
  vidname: '',
  reason: '',
};

export default AlarmForm;