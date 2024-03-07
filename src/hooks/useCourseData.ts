import { useQuery } from "react-query";

import axios from "axios"

export function useCourseData() {
  const query = useQuery({
    queryFn: () => axios.get("http://localhost:5000/courses").then((response) => response),
    queryKey: ['course-data'],
    retry: 2
  })

  return {
    ...query,
    data: query.data?.data
  }
}