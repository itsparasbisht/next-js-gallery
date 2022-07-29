import { lazy, Suspense, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { unsplash } from "../api-creds";
import SearchInput from "../components/SearchInput";
import searchQueryContext from "../context/searchQuery/SearchQueryContext";
const Images = lazy(() => import("../components/Images"));

const imagesToShow = 9;

export default function Home() {
  const [searchBy, setSearhBy] = useState("mountains");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalImages, setTotalImages] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [queryState, dispatch] = useContext(searchQueryContext);
  console.log(queryState);

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    setImages([]);
    setPage(0);
    setTotalImages("");
    getImages(true);
  }, [queryState]);

  const getImages = async (newSearch = false) => {
    setNotFound(false);
    try {
      await unsplash.search
        .getPhotos({
          query: queryState.searchFor,
          page: newSearch ? 1 : page + 1,
          per_page: imagesToShow,
        })
        .then((res) => {
          setTotalImages(res.response.total);
          setPage(page + 1);
          console.log(">>>", res.response.results);
          if (newSearch) {
            if (res.response.results == 0) {
              setNotFound(true);
            } else {
              setImages(res.response.results);
            }
          } else {
            if (res.response.results == 0) {
              setNotFound(true);
            } else {
              images.length > 0
                ? setImages([...images, ...res.response.results])
                : setImages(res.response.results);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SearchInput />
      <Suspense fallback={<p>Fetching your images, please wait</p>}>
        {notFound ? (
          <h3>Cant find any image, try something else</h3>
        ) : (
          <InfiniteScroll
            dataLength={images.length}
            next={() => getImages()}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {images.length > 0 ? (
              <>
                <Images images={images} />
                {images.length === totalImages ? (
                  <h3>Nothing more to show :)</h3>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </InfiniteScroll>
        )}
      </Suspense>
    </>
  );
}
