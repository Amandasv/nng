import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useMutation, useQuery, useQueryClient, useQueries } from 'react-query';
import { useCourseData } from './hooks/useCourseData'
import Course from './components/course/Course';
import { Tile } from './components/course/Tile';

function App() {

  const { data, isLoading } = useCourseData();

  // if (isLoading) {
  //   return <div className="loading">Carregando...</div>;
  // }

  // if (coursesQuery.error) {
  //   return <div className="loading">Algo deu errado!</div>;
  // }
  
  console.log('isLoading', isLoading)
  console.log('aqui', data ? data[0] : '')


  return (
    <div className="app-container">
      <div className="todos">
        <h2>Todos & React Query</h2>


        {data?.map((item: Course) => (
          <>
            <Tile course={item} /> 
          </>

        ))}
  
        {/* <Tile course={fakeCourse} /> */}
        {/* {courses.map((course: any) => (
          <div
            onClick={() =>
              mutation.mutate(course.id)
            }
            key={course.id}
          >
            {course.id}
          </div>
        ))}
        <hr/>
        {saves.map((saved: any) => (
          <div
            key={saved.id}
          >
            {saved.id}
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default App;
