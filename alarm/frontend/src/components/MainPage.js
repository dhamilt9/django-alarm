import React, { Component } from 'react';
import PropTypes from "prop-types";
import VideoList from './VideoList';
import Form from './Form';
import Video from './Video';
import AlarmStatusDisplay from './AlarmStatusDisplay';
import css from './main.css';

class MainPage extends Component{
	constructor(props){
		super(props);
		this.state={
			onSuccess: false,
			updateVideo: false,
			data:{
				id:"",
				modified_at:"",
				name: "",
				status: "",
			},
			videoNodes: null
		};
		this.onSuccess=this.onSuccess.bind(this)
		this.fetchAlarmStatus=this.fetchAlarmStatus.bind(this)
	}
	
	componentDidMount(){
		this.fetchAlarmStatus();
		this.fetchVideos()
	}
	fetchVideos(){
		fetch('videos/video')
		.then(
			response => {
				if (response.status !== 200) {
					return this.setState({ placeholder: "Something went wrong" });
				}
				return response.json();
			})
		.then(
			data => {
				this.setState({ videonodesdata: data })
				this.setState({
					videoNodes: this.state.videonodesdata.map(video => (
						<Video time={video.time} key={video.id} id={video.id} src={video.src} reason={video.reason} name={video.name}></Video>
					)).reverse()
				})
			}
		);
	}
	fetchAlarmStatus(){
		fetch(`alarmstatus/alarm/1`)
		.then(response => {
			if (response.status!==200){
				return this.setState({
					placeholder: "Something went wrong!"
				});
			}
			return response.json();
		})
		.then(data=>this.setState({
			data
		}));
	}
	
	onSuccess(modified_at, name, status){
		this.setState({
			onSuccess: true,
			data:{
				modified_at:modified_at,
				name:name,
				status:status
			}
		});
		this.interval = setInterval(() => 
		{
			console.log("Hello!");
			const waiting = ["CON", "PRO", "UP", "RIN"]
			if (waiting.includes(this.state.data.status)){
				this.fetchAlarmStatus()
			}else{
				this.fetchVideos()
				clearInterval(this.interval)
			}
		}, 1000);
	}
	
	render(){
		return(
			<div className="container">
				<AlarmStatusDisplay
					status={this.state.data}
				/>
				<Form
					onSuccess={this.onSuccess}
					endpoint='alarmstatus/ringalarm'
				/>
				<VideoList
					nodes={this.state.videoNodes}
				/>
			</div>
		)
	}
}

export default MainPage;