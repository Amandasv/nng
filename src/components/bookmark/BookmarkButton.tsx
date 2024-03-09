import { useEffect, useState } from "react";
import { useBookmarkData, useRemoveBookmark, useSaveBookmark } from "../../hooks/useBookmarkData";
import { Saved } from "./Saved";
import { error } from "console";
import { Button } from "@mui/joy";
import { BookmarkBorderOutlined, BookmarkOutlined } from "@mui/icons-material";

export function BookmarkButton({ id }: Saved) {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const { saveBookmark } = useSaveBookmark();
  const { deleteCourse } = useRemoveBookmark();
  const { data: bookmarkedData, isLoading: isLoadingBookmarked } = useBookmarkData();

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [bookmarkedList, setBookmarkedList] = useState<Saved[]>([]);

  useEffect(() => {
    if (bookmarkedData) {
      setBookmarkedList(bookmarkedData);
    }
  }, [bookmarkedData, bookmarked])

  useEffect(() => {
    if(bookmarkedList.some(item => item.id === id)){
      setIsBookmarked(true)
    } else {
      setIsBookmarked(false)
    }
  }, [id])

  const addBookmark = () => {
    if (id) {
      try {
        saveBookmark.mutate(id)
        setIsBookmarked(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const removeBookmark = () => {
    if(id) {
      try {
        deleteCourse.mutate(id)
        setIsBookmarked(false) 
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark();
    } else {
      addBookmark();
    }
  }

  return (
    <Button color="primary" onClick={handleBookmarkClick} variant="plain" startDecorator={isBookmarked ? <BookmarkOutlined />: <BookmarkBorderOutlined /> }
      sx={[{ mt: '10px', fontSize: '1rem' },
      {
        '&:hover': { textDecoration: 'underline', backgroundColor: 'white' }
      }]}>
      Save Course
    </Button>
  )
}
