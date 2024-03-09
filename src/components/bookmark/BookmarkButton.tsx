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

  // const existe = bookmarkedList.some(item => item.id === id);

  useEffect(() => {
    console.log('id->', id)
    // if (existe) {
    //   console.log('caiu no useEffect')
    //   setBookmarked(true)
    // }
  }, [id])


  // console.log('existe??', existe)

  // console.log('state -bookmarkedList', bookmarkedList)


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
    console.log('caiu no removeBookmark')
    // if (deleteCourse.isSuccess) {
    //   console.log('foi DELETADO com SUCESSO')
    //   setBookmarked(false)
    // }
  }

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      console.log('true')
      removeBookmark();
    } else {
      console.log('false')
      addBookmark();
    }
  }

  // const toggleBookmark = () => {
  //   setIsBookmarked(prevState => !prevState);
  // };

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

// {bookmarkedData?.map((item: any) => (
//   <>
//     <p>Id: {item.id}</p>
//   </>

// ))}

// <button onClick={handleBookmarkClick}>
// {bookmarked ? 'Remover Bookmark' : 'Adicionar Bookmark'}
// </button>
// {bookmarked && <p>id: {id} Adicionado!</p>}