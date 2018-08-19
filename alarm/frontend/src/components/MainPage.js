import React, { Component } from 'react';
import PropTypes from "prop-types";
import VideoList from './VideoList';
import AlarmForm from './AlarmForm';

const MainPage = ({ data }) =>
	!data.length ? (
		<p>Nothing to show</p>
	) : (
		<div className="container">
			<div className="form">
				<AlarmForm />
			</div>
			<div className="videos">
				<h2>Videos:</h2>
				<VideoList data={ data } />
			</div>
		</div>
	);

export default MainPage;