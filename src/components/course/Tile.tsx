
import { Card, CardContent } from "@mui/joy";
import Course from "./Course"

export interface CourseInterface {
  course: Course;
}

export function Tile({ course }: CourseInterface) {
  const { id, dates, location, instructors } = course
  return (
    <>
    
      <CardContent>
        <p>Id: {id} </p>
        {dates.map((date) => (
          <>
            <p>Start: {date[0]}</p>
            <p>End: {date[1]}</p>
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

