import React, {Component} from 'react';

class AlarmStatusDisplay extends Component {
  
	constructor(props){
		super(props);
		this.state = {
			pictures: {
        "OFF": "https://s3.amazonaws.com/hamiltonalarmvideos/Assets/Clock+States+0+-+Offline.png",
        "ON": "https://s3.amazonaws.com/hamiltonalarmvideos/Assets/Clock+States+1+-+Ready.png",
        "CON": "https://s3.amazonaws.com/hamiltonalarmvideos/Assets/Clock+States+2+-+Ringing.png",
        "RIN": "https://s3.amazonaws.com/hamiltonalarmvideos/Assets/Clock+States+3+-+Filming.png",
        "PRO": "https://s3.amazonaws.com/hamiltonalarmvideos/Assets/Clock+States+4+-+Processing.png",
        "UP": "https://s3.amazonaws.com/hamiltonalarmvideos/Assets/Clock+States+5+-+Uploading.png",
        "SECOND": "https://s3.amazonaws.com/hamiltonalarmvideos/Assets/DWD+Second+Hand.png" 
      },
      rotate:0,
		};
    this.rotateSecond=this.rotateSecond.bind(this);
	}
	
  componentDidMount(){
    Object.values(this.state.pictures).forEach((picture) => {
      const img = new Image();
      img.src = picture;
    });
    this.rotateSecond();
  }
  rotateSecond(){
    this.interval = setInterval(() => 
    {
      if (this.props.running){
        const newrotate=this.state.rotate+4
        this.setState({rotate:newrotate})
      }else{
        this.setState({rotate:0})
      }
    }, 500);
  }
  
  render() {
    const secondstyle={
      transform: `rotate(${this.state.rotate}deg)`
    }
    return (
      <div id="imageWrapper">
        <div id="imageContainer">
          <img className="alarmimg" src={this.state.pictures[this.props.status.status]}></img>
          <img className="secondhand" style={secondstyle} src={this.state.pictures["SECOND"]}></img>
        </div>
      </div>
    );
  }
}

export default AlarmStatusDisplay;