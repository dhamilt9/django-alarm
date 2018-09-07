import React, {Component} from 'react';
import { Alert, Button } from 'react-bootstrap';

class AlertDisplay extends Component {
	constructor(props){
		super(props);
		this.state = {
			show: true
		};
    this.handleDismiss = this.handleDismiss.bind(this);
    
	}

  handleDismiss() {
    this.props.clearError();
  }
  
  render() {
    if (!(this.props.error=="")) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <h4>Error:</h4>
          <p>
            {this.props.error}
          </p>
        </Alert>
      );
    }

    return "";
  }
}

export default AlertDisplay;