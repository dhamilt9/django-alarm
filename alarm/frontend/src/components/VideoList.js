import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

class VideoList extends Component {
	constructor(props){
		super(props);
		this.state={
			videonodes: this.props.nodes,
		}
	}
	
	render() {
		return (
			<div>
				{this.props.nodes}
			</div>
		);
	}
}

export default VideoList;