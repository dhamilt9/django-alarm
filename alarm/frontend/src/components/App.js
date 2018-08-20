import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import MainPage from "./MainPage";
import Form from "./Form";

const App = () => (
  <React.Fragment>
	  <DataProvider endpoint="videos/video" render={data => <MainPage data={data} />} />
	  <Form endpoint="/videos/video" />
  </React.Fragment>
	 
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;