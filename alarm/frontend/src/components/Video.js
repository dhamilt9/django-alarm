import React from 'react';

const Video = props => (
	<div className="singleVideo">
		<div className="singleVideoContent">
			<h3>Name: "{props.name}"</h3>
			<h3>Time: "{props.time}"</h3>
			<h3>Reason: "{props.reason}"</h3>
		</div>
		<video src={props.src} className="wakeupVideo" controls="controls" width="320" height="240"></video>
	</div>
)

export default Video;