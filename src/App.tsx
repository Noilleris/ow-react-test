import React from 'react';
import './App.css';
import UsageTable from "./components/datatable/Table";
import Header from "./components/header/header";
import UsageBarChart from "./components/charts/usage";
import useFetchData from "./state/usage";
import UsageErrorMessage from "./components/errors/usage";

function App() {
  const {data, isLoading, error} = useFetchData("http://127.0.0.1:5000/usage");

  if (error) {
    return (
      <div className="App">
        <Header />
        <UsageErrorMessage message={error}/>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />

      <UsageBarChart data={data} isLoading={isLoading} />
      <UsageTable data={data} isLoading={isLoading} />
    </div>
  );
}

export default App;
