import React from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

const VideoList = (props) => {
	const videoNodes = props.data.map(video => (
		<Video timestamp={video.timestamp} key={video._id} id={video._id} vidsource={video.vidsource} reason={video.reason} vidname={video.vidname}>
		</Video>
	));
	return(
		<div>
			{ videoNodes }
		</div>
	)
}

VideoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.string,
    id: PropTypes.string,
    vidsource: PropTypes.string,
    reason: PropTypes.string,
    vidname: PropTypes.string,
  })),
};

VideoList.defaultProps = {
  data: [],
};

export default VideoList;