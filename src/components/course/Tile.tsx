
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/joy";
import Course from "./Course"
import * as moment from 'moment';
import { formatedDate, getLocationTimezoneName, getMonthAndDay } from "../../utils";

export interface CourseInterface {
  course: Course;
}

export function Tile({ course }: CourseInterface) {

  return (
    <Grid container spacing={2} sx={{pl: '30px'}}>
      <Grid xs={8}>
        <Typography level="h3" sx={{ fontWeight: 700 }}>
          {formatedDate(course.dates).text}
        </Typography>
        <Typography level="h3" sx={{ fontWeight: 400 }}>
          {formatedDate(course.dates).time}
        </Typography>
        <Typography level="title-sm" sx={{marginBottom: '10px'}}>
          {getLocationTimezoneName(course.location.timezone)}
        </Typography>

        <Typography level="title-sm">
          <strong>${course.pricing.amount} {course.pricing.currency}</strong> Until {getMonthAndDay(course.pricing.valid_until)}
        </Typography>
      </Grid>
      <Grid sx={{justifySelf: "left"}} xs={4}>
        <Grid sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Grid >
            <Avatar alt="Remy Sharp" src={course.instructors[0].portrait_image} size="lg" />
          </Grid>
            <Typography level="title-sm" sx={{ fontWeight: 400 }}>Instructor:</Typography>
            <Typography level="title-sm" sx={{ fontWeight: 400 }}>{course.instructors[0].first_name}</Typography>
          </Grid>
        </Grid>
    </Grid>
  )
}

