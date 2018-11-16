import React, { Component } from 'react';
import PropTypes from "prop-types";
import VideoList from './VideoList';
import AlertDisplay from './AlertDisplay';
import RingAlarmForm from './RingAlarmForm';
import Video from './Video';
import AlarmStatusDisplay from './AlarmStatusDisplay';
import css from './main.css';
import { Alert, Grid, Row, Col, ProgressBar, Modal } from 'react-bootstrap';
import { Textfit } from 'react-textfit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


class MainPage extends Component{
	constructor(props){
		super(props);
		this.state={
			onSuccess: false,
      videoRefresh: false,
      error: "",
      button:true,
			alarmdata:{
				id:"",
				modified_at:"",
				name: "",
				status: "",
			},
      running:false,
      videoNodes: [],
      showFAQ: false,
		};
		this.onSuccess=this.onSuccess.bind(this)
		this.onFailure=this.onFailure.bind(this)
		this.onClick=this.onClick.bind(this)
		this.clearError=this.clearError.bind(this)
		this.videoPoll=this.videoPoll.bind(this)
		this.fetchAlarmStatus=this.fetchAlarmStatus.bind(this)
    this.showFAQ = this.showFAQ.bind(this);
    this.hideFAQ = this.hideFAQ.bind(this);
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
						<Video time={video.time.split(/[ ,.]+/).slice(-1).join()} date={video.time.split(/[ ,.]+/).slice(0,2).join(" ")} key={video.id} id={video.id} src={video.src} reason={video.reason} name={video.name}></Video>
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
        this.setState({
          running:false
        })
        setTimeout(function(){ var elem=document.getElementById("videoList"); elem.scrollIntoView();}, 500);
      }else if(data.status=="ON"){
        this.setState({
          running:false
        })
      }
      const percentMap={CON: 0, RIN: 5, PRO: 45, UP: 78}
      if (["CON", "RIN", "PRO", "UP"].indexOf(data.status) > -1){
        this.setState({
          button:false,
        })
        if (previousStatus!=data.status){
          this.setState({
            running:true,
          })
        }else{
          this.setState({running:true})
        }
      }else{
        this.setState({
          button:true
        })
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
	onClick(){
		this.setState({
			button: false,
		});
	}
  
  clearError(){
    this.setState({error: ""})
  }
  
  showFAQ(){
    this.setState({showFAQ:true})
  }
  hideFAQ(){
    this.setState({showFAQ:false})
  }
	
	render(){
		return(
			<Grid style={{marginTop: 20}} className="show-grid mt-100">
        <div id="topRight">
          <FontAwesomeIcon onClick={this.showFAQ} icon={faQuestionCircle} />
        </div>
        <Modal show={this.state.showFAQ} onHide={this.hideFAQ}>
          <Modal.Header closeButton>
            <Modal.Title>F.A.Q.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>What is this?</h4>
            <p>I built an alarm clock, and gave you control.</p>
            <h4>What happens if I click the button?</h4>
            <p>The alarm clock next to my bed will go off.</p>
            <h4>How will I know it worked?</h4>
            <p>After the alarm goes off, a video of me waking up will be uploaded to this website.</p>
            <h4>But why?</h4>
            <p>I have trouble getting up on time, and I wanted my people to be able to make sure I'm up.</p>
            <h4>What time would you like to be woken up?</h4>
            <p>Around 8:30am on weekdays and 11:30am on weekends</p>
            <h4>How do you know people won't abuse the system?</h4>
            <p>I'm a very trusting individual.</p>
            <h4>I'm a nerd, how does this work?</h4>
            <p>The website is built with Django and React. The alarm clock is a raspberry pi.</p>
            <h4>Who made this?</h4>
            <p>I'm glad you asked! My name is Dan Hamilton, and you can visit my website <a href="http://www.danhamiltononline.com">here</a>. The lovely graphic design was done by my good friend <a href="https://www.instagram.com/eli__sundae">Eli Sundae</a>.</p>
          </Modal.Body>
        </Modal>
        <div id="textfitContainer">
          <Textfit className="customHeader customHeader1" mode="single">
            Do Wake Danny
          </Textfit>
          <Textfit className="customHeader customHeader2" mode="single">
            The World's First Crowd-Sourced, Trust-Based Alarm Clock
          </Textfit>
        </div>
        <AlertDisplay 
          error={this.state.error}
          clearError={this.clearError}
        />
        <Row>
          <AlarmStatusDisplay
            status={this.state.alarmdata}
            running={this.state.running}
          />
        </Row>
        <Row>
          <RingAlarmForm
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            button={this.state.button}
            onClick={this.onClick}
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