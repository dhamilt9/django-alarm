import React, { Component } from 'react';
import PropTypes from "prop-types";
import VideoList from './VideoList';
import AlertDisplay from './AlertDisplay';
import RingAlarmForm from './RingAlarmForm';
import Video from './Video';
import AlarmStatusDisplay from './AlarmStatusDisplay';
import css from './main.css';
import { Alert, Grid, Row, Col } from 'react-bootstrap';

class MainPage extends Component{
	constructor(props){
		super(props);
		this.state={
			onSuccess: false,
      videoRefresh: false,
      error: "",
			alarmdata:{
				id:"",
				modified_at:"",
				name: "",
				status: "",
			},
			videoNodes: []
		};
		this.onSuccess=this.onSuccess.bind(this)
		this.onFailure=this.onFailure.bind(this)
		this.clearError=this.clearError.bind(this)
		this.videoPoll=this.videoPoll.bind(this)
		this.fetchAlarmStatus=this.fetchAlarmStatus.bind(this)
	}
	
	componentDidMount(){
		this.fetchAlarmStatus();
		this.fetchVideos()
    this.videoPoll()
	}
  
	fetchVideos(){
		fetch('videos/video')
		.then(
			response => {
				if (response.status !== 200) {
          return this.onFailure("Couldn't fetch videos");
				}
				return response.json();
			})
		.then(
			data => {
				this.setState({
					videoNodes: data.map(video => (
						<Video time={video.time} key={video.id} id={video.id} src={video.src} reason={video.reason} name={video.name}></Video>
					)).reverse()
				})
			}
		);
	}
	fetchAlarmStatus(){
    const previousStatus=this.state.alarmdata.status
		fetch(`alarmstatus/alarm/1`)
		.then(response => {
			if (response.status!==200){
				return this.onFailure("Couldn't fetch alarm status")
			}
			return response.json();
		})
		.then(data=> {
			this.setState({
				alarmdata: data
			})
      if (previousStatus=="UP" && data.status=="ON"){
        this.fetchVideos();
      }
		});
	}
	
  videoPoll(){
    this.interval = setInterval(() => 
    {
      this.fetchAlarmStatus()
    }, 1000);
  }
  
	onSuccess(modified_at, name, status){
		this.setState({
			onSuccess: true,
			alarmdata:{
				modified_at:modified_at,
				name:name,
				status:status
			}
		});
	}
  
	onFailure(error){
		this.setState({
			onSuccess: false,
			error: error,
		});
	}
  
  clearError(){
    this.setState({error: ""})
  }
	
	render(){
		return(
			<Grid style={{marginTop: 50}} className="show-grid mt-100">
        <AlertDisplay 
          error={this.state.error}
          clearError={this.clearError}
        />
        <Row>
          <AlarmStatusDisplay
            status={this.state.alarmdata}
          />
        </Row>
        <Row>
          <RingAlarmForm
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            endpoint='alarmstatus/ringalarm'
          />
        </Row>
        <Row>
          <VideoList
            nodes={this.state.videoNodes}
          />
        </Row>
			</Grid>
		)
	}
}

export default MainPage;