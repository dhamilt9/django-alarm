import React from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

const VideoList = (props) => {
	const videoNodes = props.data.map(video => (
		<Video time={video.time} key={video.id} id={video.id} src={video.src} reason={video.reason} name={video.name}>
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
    time: PropTypes.string,
    id: PropTypes.number,
    src: PropTypes.string,
    reason: PropTypes.string,
    name: PropTypes.string,
  })),
};

VideoList.defaultProps = {
  data: [],
};

export default VideoList;