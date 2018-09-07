import React from 'react';

const Video = props => (
	<div className="singleVideo">
		<div className="singleVideoContent">
			<h4>Name: {props.name}</h4>
			<h4>Reason: {props.reason}</h4>
			<h4>Time: {props.time}</h4>
		</div>
		<video src={props.src} className="wakeupVideo" controls="controls" width="100%" height="auto"></video>
	</div>
)

export default Video;