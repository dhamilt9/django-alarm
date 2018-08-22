import React from 'react';

const AlarmStatusDisplay = props => (
	<h3>{props.data.description.status_desc}</h3>
)

export default AlarmStatusDisplay;