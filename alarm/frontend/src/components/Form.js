import React, { Component } from "react";
import PropTypes from "prop-types";
import CSRFToken from './csrftoken';

class Form extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };
  state = {
    name: "",
    reason: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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
    const { name, reason } = this.state;
    const csrfmiddlewaretoken = csrftoken
    const alarmcall = { name, reason, csrfmiddlewaretoken };
    console.log(alarmcall);
    console.log(JSON.stringify(alarmcall));
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
      response => response.text()
    ).then(
      response => {
        var payload=JSON.parse(response);
        if (payload.success==true){
          this.props.onSuccess(payload.alarm.modified_at, payload.alarm.name, payload.alarm.status);
        }
      }
    );
  };
  render() {
    const { name, reason } = this.state;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
          <CSRFToken />
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Reason for wakeup</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="reason"
                onChange={this.handleChange}
                value={reason}
                required
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              Wake Dan Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Form;