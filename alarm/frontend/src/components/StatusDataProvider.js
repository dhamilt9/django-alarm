import React, {
	Component
}
from "react";
import PropTypes from "prop-types";
class StatusDataProvider extends Component {
	static propTypes = {
		endpoint1: PropTypes.string.isRequired,
		endpoint2: PropTypes.string.isRequired,
		render: PropTypes.func.isRequired
	};
	state = {
		data1: [],
		finaldata: [],
		loaded: false,
		placeholder: "Loading..."
	};
	componentDidMount() {
		fetch(this.props.endpoint1)
		.then(response => {
			if (response.status !== 200) {
				return this.setState({
					placeholder: "Something went wrong"
				});
			}
			return response.json();
		})
		.then(data1 => this.setState({
				data1: data1
			}));
		fetch(this.props.endpoint2)
		.then(response => {
			if (response.status !== 200) {
				return this.setState({
					placeholder: "Something went wrong"
				});
			}
			return response.json();
		})
		.then(data2 => 
			this.setState({ data2: data2, loaded: true, finaldata: {statusid: this.state.data1.status_id, description: data2[this.state.data1.status_id-1] }})
		);
	}
	render() {
		const {
			data1,
			finaldata,
			loaded,
			placeholder
		} = this.state;
		return loaded ? this.props.render(finaldata) :  < p > {
			placeholder
		}
		 <  / p > ;
	}
}
export default StatusDataProvider;