import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Video from './Video';
import ShowMore from '@tedconf/react-show-more';

class VideoList extends Component {
	constructor(props){
		super(props);
		this.state = {
			videonumber: 2
		};
		this.showMore=this.showMore.bind(this);
	}
	
	showMore(e){
		e.preventDefault();
		this.setState({videonumber: this.state.videonumber+2})
	}
	
	render() {
		return (
			<div>
				<ShowMore items={this.props.nodes} by={5}>
					{({ current, onMore }) => (
					<div>
					{current}
						{onMore && <button
							onClick={() => {
								if (!!onMore){
									onMore();
								}
							}}
							>
							See more
						</button>}
					</div>
					)}
				</ShowMore>
			</div>
		);
	}
}

export default VideoList;