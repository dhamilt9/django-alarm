import React, { Component } from "react";
import PropTypes from "prop-types";
import CSRFToken from './csrftoken';
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
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = $.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    const { name, reason, recaptchaValue } = this.state;
    const csrfmiddlewaretoken = csrftoken
    const alarmcall = { name, reason, csrfmiddlewaretoken, recaptchaValue };
    const conf = {
      method: "post",
      body: JSON.stringify(alarmcall),
      headers: {
        "X-CSRFToken": csrftoken,
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
          <CSRFToken />
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
            size="compact"
            style={{ marginBottom: 10 }}
            id="captcha"
            sitekey="6Leq4m4UAAAAABQcZpwJ-By6fBpvvXvIPTbBhI_W"
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