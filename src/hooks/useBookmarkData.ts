import axios, { AxiosPromise, AxiosResponse } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

export function useBookmarkData() {
  const query = useQuery({
    queryFn: () => axios.get("http://localhost:5000/saved").then((response) => response),
    queryKey: ['saved-data'],
    retry: 2
  })

  return {
    ...query,
    data: query.data?.data
  }
}

export function useSaveBookmark() {
  const { data: currentSaved } = useBookmarkData();
  const queryClient = useQueryClient();

  let courseId: { id: string; };

  const postData = async (courseId: string): Promise<AxiosResponse<any>> => {
    courseId=courseId;
    const response = axios.post(`http://localhost:5000/saved`, { id: courseId })
    return response;
  }

  const saveBookmark = useMutation({
    mutationFn: postData,
    onSuccess: () => queryClient.invalidateQueries(['saved-data']),
    onError: (error) => {
      console.error(error);
    },
  })

  return {
    saveBookmark
  }
}

export function useRemoveBookmark() {
  const { data: currentSaved } = useBookmarkData();
  const queryClient = useQueryClient();

  let courseId: { id: string; };

  const deleteData = async (courseId: string): Promise<AxiosResponse<any>> => {
    courseId=courseId;
    const response = axios.delete(`http://localhost:5000/saved/${courseId}`)
    return response;
  }

  // const deleteCourse = useMutation((courseId) => {
  //   return axios.delete(`http://localhost:3004/posts/${courseId}`);
  // });


  const deleteCourse = useMutation({
    mutationFn: deleteData,
    onSuccess: () => queryClient.invalidateQueries(['saved-data']),
    onError: (error) => {
      console.error(error);
    },
  })

  return {
    deleteCourse
  }
}

