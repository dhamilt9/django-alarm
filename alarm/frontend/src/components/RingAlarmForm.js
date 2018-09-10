import React, { Component } from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Input, Label, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';


class RingAlarmForm extends Component {
  constructor(props) {
    super(props);
    this._reCaptchaRef = React.createRef();
  }
  state = {
    name: "",
    reason: "",
    recaptchaValue: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  reCaptchaChange = value => {
    this.setState({ recaptchaValue: value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
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
          <ControlLabel className="formLabel">Name</ControlLabel>
          <FormControl
            style={{ marginBottom: 10 }}
            className="formInput"
            type="text"
            name="name"
            onChange={this.handleChange}
            value={name}
            required
          />
          <ControlLabel className="formLabel">Reason for wakeup</ControlLabel>
          <FormControl
            style={{ marginBottom: 10 }}
            className="formInput"
            type="text"
            name="reason"
            onChange={this.handleChange}
            value={reason}
            required
          />
          <ReCAPTCHA
            size="invisible"
            id="captcha"
            sitekey="6Lf9hW8UAAAAAD6f0ob_mZD3QsW0_K--Gf5h6Xey"
            ref={this._reCaptchaRef}
            onChange={this.reCaptchaChange}
          />
          <Button 
            style={{ marginBottom: 10 }}
            type="submit"
          >
            Wake Dan Up!
          </Button>
      </form>
    );
  }
}
export default RingAlarmForm;