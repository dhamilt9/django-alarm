import React from 'react';

const Video = props => (
	<div className="singleVideo">
		<video src={props.src} className="wakeupVideo" controls="controls" width="100%" height="auto"></video>
		<div className="singleVideoContent">
			<h4>Name: <span className="alarmdata">{props.name}</span></h4>
			<h4>Reason: <span className="alarmdata alarmreason">{props.reason}</span></h4>
      <h4>Date: <span className="alarmdata">{props.date}</span></h4>
			<h4>Time: <span className="alarmdata">{props.time}</span></h4>
		</div>
    <div className="or-spacer"><div className="mask"></div></div>  
	</div>   
)

export default Video;