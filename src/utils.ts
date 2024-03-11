import moment from "moment";

export interface DateTimeInfo {
  text: string;
  time: string;
}

export function formatedDate(timestamp: [number, number][]): DateTimeInfo {
  const weekdays: string[] = [];
  const monthNames: string[] = [];
  const daysOfMonth: string[] = [];
  const startTimes: string[] = [];
  const endTimes: string[] = [];

  for (const pair of timestamp) {
    const startTime = moment.unix(pair[0]);
    const endTime = moment.unix(pair[1]);

    const startWeekday = startTime.format("dddd");
    const endWeekday = endTime.format("dddd");
    const monthName = startTime.format("MMMM");
    const startDayOfMonth = startTime.format("DD");
    const endDayOfMonth = endTime.format("DD");
    const startTimeFormatted = formatTime(startTime);
    const endTimeFormatted = formatTime(endTime);

    weekdays.push(startWeekday, endWeekday);
    monthNames.push(monthName);
    daysOfMonth.push(startDayOfMonth, endDayOfMonth);
    startTimes.push(startTimeFormatted);
    endTimes.push(endTimeFormatted);
  }

  const uniqueWeekdays = weekdays.filter(
    (day, index) => weekdays.indexOf(day) === index,
  );
  const uniqueMonthNames = monthNames.filter(
    (month, index) => monthNames.indexOf(month) === index,
  );
  const uniqueDaysOfMonth = daysOfMonth.filter(
    (day, index) => daysOfMonth.indexOf(day) === index,
  );
  const uniqueStartTimes = startTimes.filter(
    (time, index) => startTimes.indexOf(time) === index,
  );
  const uniqueEndTimes = endTimes.filter(
    (time, index) => endTimes.indexOf(time) === index,
  );

  const formattedWeekdays =
    uniqueWeekdays.length > 1
      ? `${uniqueWeekdays.join(" & ")}`
      : `${uniqueWeekdays[0]}`;
  const formattedDaysOfMonth =
    uniqueDaysOfMonth.length > 1
      ? `${uniqueDaysOfMonth.join(" & ")}`
      : `${uniqueDaysOfMonth[0]}`;
  const formattedMonthNames =
    uniqueMonthNames.length > 1
      ? `${uniqueMonthNames.join(", ")}`
      : `${uniqueMonthNames[0]}`;
  const formattedStartTimes = uniqueStartTimes.join(" - ");
  const formattedEndTimes = uniqueEndTimes.join(" - ");

  const text = `${formattedWeekdays}, ${formattedMonthNames} ${formattedDaysOfMonth}`;
  const time = `${formattedStartTimes} - ${formattedEndTimes}`;

  return {
    text: text,
    time: time,
  };
}

export function formatTime(time: moment.Moment): string {
  const hour = time.format("h");
  const minute = time.format("mm");
  const period = time.format("a");

  if (minute === "00") {
    return `${hour} ${period}`;
  } else {
    return `${hour}:${minute} ${period}`;
  }
}

export function getLocationTimezoneName(timezone: string): string {
  const timezoneMap: { [key: string]: string } = {
    "America/New_York": "New York City Time",
  };
  return timezoneMap[timezone] || timezone;
}

export function getMonthAndDay(timestamp: number): string {
  const date = moment.unix(timestamp);
  const month = date.format("MMMM");
  const day = date.format("DD");
  return `${month} ${day}`;
}
