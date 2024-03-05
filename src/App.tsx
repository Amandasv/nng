import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useQuery } from 'react-query';
import axios from 'axios';

function App() {
  const {data, isLoading, } = useQuery("api", () => {
    return axios
      .get("http://localhost:5000/api")
      .then(response => response.data)
  });

  if(isLoading) {
    return <p>Loading</p>
  }

  console.log(data)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {data.courses.map((course:any) => (
          <a>{course.id}</a>
        ))}
        
      </header>
    </div>
  );
}

export default App;
