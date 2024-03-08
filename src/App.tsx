import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { useMutation, useQuery, useQueryClient, useQueries } from 'react-query';
import { useCourseData } from './hooks/useCourseData'
import Course from './components/course/Course';
import { Tile } from './components/course/Tile';
import { useBookmarkData, useSaveBookmark } from './hooks/useBookmarkData';
import { BookmarkButton } from './components/bookmark/BookmarkButton';

function App() {

  const { data: courseListData, isLoading: isLoadingCourse } = useCourseData();
  const {saveBookmark} = useSaveBookmark();
  const [selectedCourse, setSelectedCourse] = useState('')
  console.log('selectedCourse', selectedCourse)



  return (
    <div className="app-container">
      <div className="todos">
        <h2>Todos & React Query</h2>


        {courseListData?.map((item: Course) => (
          <>
          <div onClick={() => setSelectedCourse(item.id)}>
            <Tile course={item}/> 
          </div>
            
          </>

        ))}

        {/* <div
          onClick={() => saveBookmark.mutate('999')}
        >
          clica aqui
        </div> */}
        <hr/>
        <hr/>

        <BookmarkButton id={selectedCourse}/>
      </div>
    </div>
  );
}

export default App;
