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
import { Card, FormControl, Grid, Radio, RadioGroup, Sheet, Typography } from '@mui/joy';

function App() {

  const { data: courseListData, isLoading: isLoadingCourse } = useCourseData();
  const { saveBookmark } = useSaveBookmark();
  const [selectedCourse, setSelectedCourse] = useState('')
  console.log('selectedCourse', selectedCourse)

  return (
    <div className="app-container">
      <div className="todos">
        <h2>Todos & React Query</h2>

        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid xs={12}>
            <Grid container justifyContent="center" spacing={4}>
            <FormControl>
              <RadioGroup
                overlay
                name="member"
                orientation="horizontal"
                sx={{ gap: 2 }}
              >
                {courseListData?.map((item: Course) => (
                  <Grid key={item.id}>
                    <Sheet
                      component="label"
                      key={item.id}
                      variant="outlined"
                      sx={
                        [{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: 'sm',
                          borderRadius: 'md',
                          borderWidth: 2,
                          borderSizing: 'border-box'
                        },
                        {
                          '&:hover': {
                            borderColor: '#4D0001'
                          }
                        }
                      ]
                        }
                    >
                      <Grid
                        display="flex"
                        alignItems="flex-end"
                      > 
                         <Radio
                            value={`course${item.id}`}
                            variant="outlined"
                            sx={{flexDirection: 'row'}}
                            color="primary"
                        />
                        <Typography level="title-sm" sx={{ marginLeft: '10px' }}>
                          Virtual Course
                        </Typography>
                      </Grid>

                     
                      <div onClick={() => setSelectedCourse(item.id)}>
                        <Tile course={item} />
                      </div>
                    </Sheet>
                  </Grid>
                ))}
              </RadioGroup>

            </FormControl>
              
            </Grid>
          </Grid>
        </Grid>

        {/* <div
          onClick={() => saveBookmark.mutate('999')}
        >
          clica aqui
        </div> */}
        <hr />
        <hr />

        <BookmarkButton id={selectedCourse} />
      </div>
    </div >
  );
}

export default App;
