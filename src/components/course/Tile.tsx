
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/joy";
import Course from "./Course"
import * as moment from 'moment';

export interface CourseInterface {
  course: Course;
}

export interface DateTimeInfo {
  text: string;
  time: string;
}

function formatedDate(timestamp: [number, number][]): DateTimeInfo {

  const weekdays: string[] = [];
  const monthNames: string[] = [];
  const daysOfMonth: string[] = [];
  const startTimes: string[] = [];
  const endTimes: string[] = [];

  for (const pair of timestamp) {
    const startTime = moment.unix(pair[0]);
    const endTime = moment.unix(pair[1]);

    const startWeekday = startTime.format('dddd');
    const endWeekday = endTime.format('dddd');
    const monthName = startTime.format('MMMM');
    const startDayOfMonth = startTime.format('DD');
    const endDayOfMonth = endTime.format('DD');
    const startTimeFormatted = formatTime(startTime);
    const endTimeFormatted = formatTime(endTime);

    weekdays.push(startWeekday, endWeekday);
    monthNames.push(monthName);
    daysOfMonth.push(startDayOfMonth, endDayOfMonth);
    startTimes.push(startTimeFormatted);
    endTimes.push(endTimeFormatted);
  }

  const uniqueWeekdays = weekdays.filter((day, index) => weekdays.indexOf(day) === index);
  const uniqueMonthNames = monthNames.filter((month, index) => monthNames.indexOf(month) === index);
  const uniqueDaysOfMonth = daysOfMonth.filter((day, index) => daysOfMonth.indexOf(day) === index);
  const uniqueStartTimes = startTimes.filter((time, index) => startTimes.indexOf(time) === index);
  const uniqueEndTimes = endTimes.filter((time, index) => endTimes.indexOf(time) === index);

  const formattedWeekdays = uniqueWeekdays.length > 1 ? `${uniqueWeekdays.join(' & ')}` : `${uniqueWeekdays[0]}`;
  const formattedDaysOfMonth = uniqueDaysOfMonth.length > 1 ? `${uniqueDaysOfMonth.join(' & ')}` : `${uniqueDaysOfMonth[0]}`;
  const formattedMonthNames = uniqueMonthNames.length > 1 ? `${uniqueMonthNames.join(', ')}` : `${uniqueMonthNames[0]}`;
  const formattedStartTimes = uniqueStartTimes.join(' - ');
  const formattedEndTimes = uniqueEndTimes.join(' - ');

  const text = `${formattedWeekdays}, ${formattedMonthNames} ${formattedDaysOfMonth}`;
  const time = `${formattedStartTimes} - ${formattedEndTimes}`;

  return {
    text: text,
    time: time
  };

}

function formatTime(time: moment.Moment): string {
  const hour = time.format('h');
  const minute = time.format('mm');
  const period = time.format('a');

  if (minute === '00') {
    return `${hour} ${period}`;
  } else {
    return `${hour}:${minute} ${period}`;
  }
}

export function Tile({ course }: CourseInterface) {

  return (
    <Grid container spacing={2}>
      <Grid xs={8}>
        <Typography level="h3" sx={{wordBreak: 'break-all'}}>
          {formatedDate(course.dates).text}
        </Typography>
        <Typography level="body-lg" sx={{ fontWeight: 500 }}>
          {formatedDate(course.dates).time}
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

