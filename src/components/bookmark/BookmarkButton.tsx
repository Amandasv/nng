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

  const existe = bookmarkedList.some(item => item.id === id);

  useEffect(() => {
    if (existe) {
      console.log('caiu no useEffect')
      setBookmarked(true)
    }
  }, [id])


  console.log('existe??', existe)

  // console.log('state -bookmarkedList', bookmarkedList)


  const addBookmark = () => {
    console.log('caiu do addBookmark')
    if (id) {
      saveBookmark.mutate(id)
      if (saveBookmark.isSuccess) {
        console.log('SUCESSO')
        setBookmarked(true)
      }
    }

  }

  const removeBookmark = () => {
    console.log('caiu no removeBookmark')
    if (deleteCourse.isSuccess) {
      console.log('foi DELETADO com SUCESSO')
      setBookmarked(false)
    }
  }

  const handleBookmarkClick = () => {
    if (!bookmarked) {
      addBookmark();
    } else {
      removeBookmark();
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(prevState => !prevState);
  };

  return (
    <Button color="primary" onClick={toggleBookmark} variant="plain" startDecorator={isBookmarked ? <BookmarkOutlined />: <BookmarkBorderOutlined /> }
      sx={[{ mt: '10px', fontSize: '1rem' },
      {
        '&:hover': { textDecoration: 'underline', backgroundColor: 'white' }
      }]}>
      Save Course
    </Button>
  )
}

// {bookmarkedData?.map((item: any) => (
//   <>
//     <p>Id: {item.id}</p>
//   </>

// ))}

// <button onClick={handleBookmarkClick}>
// {bookmarked ? 'Remover Bookmark' : 'Adicionar Bookmark'}
// </button>
// {bookmarked && <p>id: {id} Adicionado!</p>}