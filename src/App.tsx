import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useQuery } from 'react-query';
import axios from 'axios';

function App() {
  const {data, isLoading, } = useQuery("courses", () => {
    return axios
      .get("http://localhost:5000/courses")
      .then(response => response.data)
  });

  if(isLoading) {
    return <p>Loading</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {data.map((course:any) => (
          <a>{course.id}</a>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
