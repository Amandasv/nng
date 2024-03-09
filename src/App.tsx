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
import { Button, Card, FormControl, Grid, Radio, RadioGroup, Sheet, Typography } from '@mui/joy';
import { BookOnlineOutlined, BookmarkAddOutlined, BookmarkBorderOutlined } from '@mui/icons-material';

function App() {

  const { data: courseListData, isLoading: isLoadingCourse } = useCourseData();
  const { saveBookmark } = useSaveBookmark();
  const [selectedCourse, setSelectedCourse] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(prevState => !prevState);
  };

  return (
    <div className="app-container">
      <div className="todos">
        <h2>Todos & React Query</h2>
        <Grid container justifyContent="center">
          <FormControl>
            <RadioGroup
              overlay
              name="member"
              orientation="vertical"
              sx={{ gap: 2 }}
            >
              {courseListData?.map((item: Course) => (
                <div onClick={() => setSelectedCourse(item.id)}>
                  <Grid key={item.id} sx={{ width: '420px' }}>
                    <Sheet component="label" key={item.id} variant="outlined"
                      sx={
                        [{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 'md',
                          borderWidth: 2,
                          borderSizing: 'border-box',
                          backgroundColor: 'white'
                        },
                        {
                          '&:hover': {
                            borderColor: '#4D0001'
                          }
                        }
                        ]
                      }
                    >
                      <Grid display="flex" alignItems="flex-end" sx={{ paddingLeft: 0 }}>
                        <Radio value={`course${item.id}`} variant="outlined" sx={{ flexDirection: 'row' }} color="primary" />
                        <Typography level="title-md" sx={{ marginLeft: '10px', fontWeight: 700, color: '#600C20' }}>
                          Virtual Course
                        </Typography>
                      </Grid>
                      <Tile course={item} />
                    </Sheet>
                  </Grid>
                </div>
              ))}
            </RadioGroup>
            <Button size="md" sx={
              [{ backgroundColor: '#ED0000', fontSize: '1.125rem' },
              {'&:hover': { backgroundColor: '#A61518'}}]}> 
              Enroll in Course
            </Button>
            <BookmarkButton id={selectedCourse} />
          </FormControl>

        </Grid>

        {/* <div
          onClick={() => saveBookmark.mutate('999')}
        >
          clica aqui
        </div> */}
        <hr />
        <hr />

        
      </div>
    </div >
  );
}

export default App;
