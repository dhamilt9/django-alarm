import React, {Component} from 'react';

class AlarmStatusDisplay extends Component {
  render() {
    return (<div id="statusBox" className={this.props.status.status + " noselect"}>Alarm: </div>);
  }
}

export default AlarmStatusDisplay;