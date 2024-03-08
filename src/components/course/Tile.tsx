
import { Card, CardContent, Typography } from "@mui/joy";
import Course from "./Course"
import * as moment from 'moment';
import { useEffect, useState } from "react";

export interface CourseInterface {
  course: Course;
}

export interface DateTimeInfo {
  dayOfWeek: string;
  month: string;
  day: string;
}

function formatedDate(timestamp: [number, number][]): string {

  const diasDaSemana: string[] = [];
    const diasDoMes: string[] = [];
    const meses: string[] = [];

    for (const pair of timestamp) {
        const start = moment.unix(pair[0]);
        const end = moment.unix(pair[1]);

        const startDay = start.format('dddd');
        const endDay = end.format('dddd');
        const month = start.format('MMMM');
        const startDayOfMonth = start.format('DD');
        const endDayOfMonth = end.format('DD');

        diasDaSemana.push(startDay, endDay);
        diasDoMes.push(startDayOfMonth, endDayOfMonth);
        meses.push(month);
    }

    const diasDaSemanaUnicos = diasDaSemana.filter((day, index) => diasDaSemana.indexOf(day) === index);
    const diasDoMesUnicos = diasDoMes.filter((day, index) => diasDoMes.indexOf(day) === index);
    const mesesUnicos = meses.filter((month, index) => meses.indexOf(month) === index);

    const diasDaSemanaFormatados = diasDaSemanaUnicos.length > 1 ? `${diasDaSemanaUnicos.join(' & ')}` : `${diasDaSemanaUnicos[0]}`;
    const diasDoMesFormatados = diasDoMesUnicos.length > 1 ? `${diasDoMesUnicos.join(' & ')}` : `${diasDoMesUnicos[0]}`;
    const mesFormatado = mesesUnicos.length > 1 ? `${mesesUnicos.join(', ')}` : `${mesesUnicos[0]}`;

    return `${diasDaSemanaFormatados}, ${mesFormatado} ${diasDoMesFormatados}`;

}

export function Tile({course}: CourseInterface) {
  
  console.log('course -> ', course.dates)
 


  return (
    <>

      <CardContent>
        <Typography level="title-lg">
        {formatedDate(course.dates)}
        </Typography>

      </CardContent>

    </>

  )
}

