import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import StatusDataProvider from "./StatusDataProvider";
import MainPage from "./MainPage";
import AlarmStatusDisplay from "./AlarmStatusDisplay";
import Form from "./Form";

const App = () => (
	<div id="app">
		<StatusDataProvider endpoint1="/alarmstatus/status/1" endpoint2 = "/alarmstatus/statuslookup " render={data => <AlarmStatusDisplay data={data} />} />
		<Form endpoint="/alarmstatus/ringalarm" />
		<DataProvider endpoint="videos/video" render={data => <MainPage data={data} />} />
	</div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;