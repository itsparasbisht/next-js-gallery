import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { unsplash } from "../api-creds";
import Images from "../components/Images";

const imagesToShow = 9;

export default function Home() {
  const [searchBy, setSearhBy] = useState("mountains");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalImages, setTotalImages] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImages();
  }, []);

  console.log(page);
  const getImages = async () => {
    console.log(page);
    try {
      await unsplash.search
        .getPhotos({
          query: searchBy,
          page: page + 1,
          per_page: imagesToShow,
        })
        .then((res) => {
          setTotalImages(res.response.total);
          setPage(page + 1);
          images.length > 0
            ? setImages([...images, ...res.response.results])
            : setImages(res.response.results);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={images.length}
        next={() => getImages()}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {!loading ? (
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
    </>
  );
}
