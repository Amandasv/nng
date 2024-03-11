import { useEffect, useState } from "react";
import {
  useBookmarkData,
  useUpdateBookmark,
} from "../../hooks/useBookmarkData";
import { Saved } from "./Saved";
import { Button } from "@mui/joy";
import { BookmarkBorderOutlined, BookmarkOutlined } from "@mui/icons-material";

export function BookmarkButton({ id }: Saved) {
  const { saveBookmark, removeBookmark } = useUpdateBookmark();
  const { data: bookmarkedData, isLoading: isLoadingBookmarked } =
    useBookmarkData();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkedList, setBookmarkedList] = useState<Saved[]>([]);

  useEffect(() => {
    if (bookmarkedData) {
      setBookmarkedList(bookmarkedData);
    }
  }, [bookmarkedData]);

  useEffect(() => {
    if (bookmarkedData) {
      const isBookmarked = bookmarkedList.some((item) => item.id === id);
      setIsBookmarked(isBookmarked);
    }
  }, [bookmarkedData, bookmarkedList, id]);

  const handleBookmarkClick = () => {
    if (!id) return;
    if (isBookmarked) {
      removeBookmark.mutate(id);
      setIsBookmarked(false);
    } else {
      saveBookmark.mutate(id);
      setIsBookmarked(true);
    }
  };

  return (
    <Button
      color="primary"
      onClick={handleBookmarkClick}
      disabled={isLoadingBookmarked}
      variant="plain"
      startDecorator={
        isBookmarked ? <BookmarkOutlined /> : <BookmarkBorderOutlined />
      }
      sx={[
        { mt: "10px", fontSize: "1rem" },
        {
          "&:hover": { textDecoration: "underline", backgroundColor: "white" },
        },
      ]}
    >
      Save Course
    </Button>
  );
}
