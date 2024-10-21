import React from 'react';
import './App.css';
import UsageTable from "./components/datatable/Table";
import Header from "./components/header/header";
import UsageBarChart from "./components/charts/usage";
import useFetchData from "./state/usage";
import UsageErrorMessage from "./components/errors/usage";
import {BrowserRouter} from "react-router-dom";

function App() {
  const {data, isLoading, error} = useFetchData("http://127.0.0.1:5000/usage");

  if (error) {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <UsageErrorMessage message={error}/>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>

        <UsageBarChart data={data} isLoading={isLoading}/>
        <UsageTable data={data} isLoading={isLoading}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
