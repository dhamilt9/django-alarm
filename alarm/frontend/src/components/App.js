import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import MainPage from "./MainPage";

const App = () => (
  <DataProvider endpoint="videos/video" 
                render={data => <MainPage data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;