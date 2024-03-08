
import { Card, CardContent } from "@mui/joy";
import Course from "./Course"
import * as moment from 'moment';

export interface CourseInterface {
  course: Course;
}

export interface DateTimeInfo {
  dayOfWeek: string;
  month: string;
  day: string;
}

function formatedDate(timestamp: number): DateTimeInfo{
  
  const convertTimestamp = moment.unix(timestamp);

  return {
    dayOfWeek: convertTimestamp.format('dddd'),
    month: convertTimestamp.format('MMMM'),
    day: convertTimestamp.format('DD')
  }
}

export function Tile({ course }: CourseInterface) {
  const { id, dates, location, instructors } = course
  console.log('couse:-', course)
  return (
    <>
    
      <CardContent>
        <p>Id: {id} </p>
        {dates.map((dateTime) => (
          <>
            <p>{dateTime.map((each) => formatedDate(each).dayOfWeek)}</p>
            <p>{formatedDate(dateTime[0]).dayOfWeek}, {formatedDate(dateTime[0]).month} {formatedDate(dateTime[0]).day}</p>
            <p>End: {dateTime[1]}</p>
            <p>Teste {formatedDate(dateTime[0]).dayOfWeek} </p>
          </>
        ))}
        <p>Location: {location.timezone}</p>
        {instructors.map((instructor) => (
          <>
            <p>
            First Name: {instructor.first_name}, Last Name: {instructor.last_name}
            </p>
          </>
        ))}
      
      </CardContent>
    
    
    {/* <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent> */}

    </>
    
  )
}

