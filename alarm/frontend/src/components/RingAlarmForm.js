import React, { Component } from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Input, Label, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';


class RingAlarmForm extends Component {
  constructor(props) {
    super(props);
    // this._reCaptchaRef = React.createRef();
  }
  state = {
    name: "",
    reason: "",
    recaptchaValue: "",
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  reCaptchaChange = value => {
    // this.setState({ recaptchaValue: value });
  }
  componentDidMount(){
    // this._reCaptchaRef.current.execute();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onClick();
    const { name, reason, recaptchaValue } = this.state;
    const alarmcall = { name, reason, recaptchaValue };
    const conf = {
      method: "post",
      body: JSON.stringify(alarmcall),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    };
    fetch(
      this.props.endpoint, 
      conf
    ).then(
      response => {
        if (response.status!==200){
          this.props.onFailure("Problem connecting to alarm API")
        }
        return response.text()
      }
    ).then(
      response => {
        var payload=JSON.parse(response);
        if (payload.success==true){
          this.props.onSuccess(payload.alarm.modified_at, payload.alarm.name, payload.alarm.status);
          this._reCaptchaRef.current.reset();
        }else if (payload.success==false){
          this.props.onFailure(payload.error);
        }
      }
    );
  };
  render() {
    const { name, reason } = this.state;
    return (
      <form className="ringAlarmForm" onSubmit={this.handleSubmit}>
          <FormControl
            style={{ marginBottom: 10 }}
            className="formInput"
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
            value={name}
            required
          />
          <FormControl
            style={{ marginBottom: 10 }}
            className="formInput"
            type="text"
            name="reason"
            placeholder="Reason for wakeup"
            onChange={this.handleChange}
            value={reason}
            required
          />
          <div id="centerMe">
            <Button style={{ marginBottom: 10 }} className="alarmButton" type="submit" disabled={!this.props.button}>Wake Dan Up!</Button>
          </div>
          <div className="or-spacer"><div className="mask"></div></div>  
      </form>
    );
  }
}
export default RingAlarmForm;