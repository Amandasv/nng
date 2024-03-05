import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useMutation, useQuery, useQueryClient, useQueries } from 'react-query';


function App() {
  const queryClient = useQueryClient();


  const coursesQuery = useQuery("courses", () =>
    axios.get("http://localhost:5000/courses").then((response) => response.data)
  );
  const savedQuery =  useQuery("saved", () =>
  axios.get("http://localhost:5000/saved").then((response) => response.data)
);


  const { data: coursesData, isLoading: isLoadingCourses, error: errorCourses } = coursesQuery
  const { data: savedData, isLoading: isLoadingSaved, error: errorSaved} = savedQuery

  const mutation = useMutation({
    mutationFn: (courseId) => {
      return axios.post('http://localhost:5000/saved', {
        id: courseId
      })
    },
    onSuccess: (data) => {
      console.log('course', data);
    },

  })

  if (coursesQuery.isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  if (coursesQuery.error) {
    return <div className="loading">Algo deu errado!</div>;
  }

  return (
    <div className="app-container">
      <div className="todos">
        <h2>Todos & React Query</h2>
        {coursesData.map((course: any) => (
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
        {savedData.map((saved: any) => (
          <div
            key={saved.id}
          >
            {saved.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
