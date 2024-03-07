import Course from "./Course"

export interface CourseInterface {
  course: Course;
}

export function Tile({ course }: CourseInterface) {
  const { id, dates, location, instructors } = course
  return (
    <div>
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
      <hr/>
    </div>
  )
}

