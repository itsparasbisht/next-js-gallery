import { useEffect, useState } from "react";
import { unsplash } from "../api-creds";
import Images from "../components/Images";

const imagesToShow = 9;

export default function Home() {
  const [searchBy, setSearhBy] = useState("mountains");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      await unsplash.search
        .getPhotos({
          query: searchBy,
          page: currentPage,
          per_page: imagesToShow,
        })
        .then((res) => {
          setTotalImages(res.response.total);
          setCurrentPage(currentPage);
          images.length
            ? setImages([...images, ...res.response.results])
            : setImages(res.response.results);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
    </>
  );
}
