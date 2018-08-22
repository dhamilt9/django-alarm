import React, { Component } from "react";
import PropTypes from "prop-types";
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
  handleSubmit = e => {
    e.preventDefault();
    const { name, reason } = this.state;
    const video = { name, reason };
    const conf = {
      method: "post",
      body: JSON.stringify(video),
      headers: new Headers({ "Content-Type": "application/json", 'Accept': 'application/json'})
    };
    fetch(this.props.endpoint, conf).then(response => response.json()).then(response => console.log(response));
  };
  render() {
    const { name, reason } = this.state;
    return (
      <div className="column">
        <form onSubmit={this.handleSubmit}>
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