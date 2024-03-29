import { useState } from "react";
import "./App.css";
import { useCourseData } from "./hooks/useCourseData";
import Course from "./components/course/Course";
import { Tile } from "./components/course/Tile";
import { BookmarkButton } from "./components/bookmark/BookmarkButton";
import {
  Button,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  Sheet,
  Typography,
} from "@mui/joy";
import { useBookmarkData } from "./hooks/useBookmarkData";

function App() {
  const { data: courseListData, isLoading: isLoadingCourse } = useCourseData();
  const { isLoading: isLoadingBookmark } = useBookmarkData();
  const [selectedCourse, setSelectedCourse] = useState("");

  const isSomethingLoading = isLoadingCourse || isLoadingBookmark;

  const handleEnrollCourse = () => {
    console.log("Going to enroll page ;)");
  };

  return (
    <Grid>
      <Grid container justifyContent="center" sx={{ pt: "20px" }}>
        <FormControl>
          <Typography level="h2" sx={{ fontWeight: 700 }}>
            Course Dates
          </Typography>
          <RadioGroup
            overlay
            name="member"
            orientation="vertical"
            sx={{ gap: 2 }}
          >
            {courseListData?.map((item: Course) => (
              <div onClick={() => setSelectedCourse(item.id)} key={item.id}>
                <Grid key={item.id} sx={{ width: "400px" }}>
                  <Sheet
                    component="label"
                    key={item.id}
                    variant="outlined"
                    sx={[
                      {
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "md",
                        borderWidth: 2,
                        borderSizing: "border-box",
                        backgroundColor: "white",
                      },
                      {
                        "&:hover": {
                          borderColor: "#4D0001",
                        },
                      },
                    ]}
                  >
                    <Grid
                      display="flex"
                      alignItems="flex-end"
                      sx={{ paddingLeft: 0 }}
                    >
                      <Radio
                        value={`course${item.id}`}
                        variant="outlined"
                        sx={{ flexDirection: "row" }}
                        color="primary"
                      />
                      <Typography
                        level="title-md"
                        sx={{
                          marginLeft: "10px",
                          fontWeight: 700,
                          color: "#600C20",
                        }}
                      >
                        Virtual Course
                      </Typography>
                    </Grid>
                    <Tile course={item} />
                  </Sheet>
                </Grid>
              </div>
            ))}
          </RadioGroup>
          <Button
            size="md"
            onClick={handleEnrollCourse}
            disabled={isSomethingLoading}
            sx={[
              { backgroundColor: "#ED0000", fontSize: "1.125rem", mt: "10px" },
              { "&:hover": { backgroundColor: "#A61518" } },
            ]}
          >
            Enroll in Course
          </Button>
          <BookmarkButton id={selectedCourse} />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default App;
