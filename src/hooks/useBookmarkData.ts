import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBookmarkData() {
  const query = useQuery({
    queryFn: () =>
      axios.get("http://localhost:5000/saved").then((response) => response),
    queryKey: ["saved-data"],
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

function useBookmarkMutation(
  mutationFn: (courseId: string) => Promise<AxiosResponse<any>>,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["saved-data"] }),
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation;
}

export function useUpdateBookmark() {
  const saveBookmark = useBookmarkMutation(async (courseId: string) => {
    const response = await axios.post(`http://localhost:5000/saved`, {
      id: courseId,
    });
    return response;
  });

  const removeBookmark = useBookmarkMutation(async (courseId: string) => {
    const response = await axios.delete(
      `http://localhost:5000/saved/${courseId}`,
    );
    return response;
  });

  return {
    saveBookmark,
    removeBookmark,
  };
}
