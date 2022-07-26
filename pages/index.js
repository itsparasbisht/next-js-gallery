import { useEffect, useState } from "react";
import { unsplash } from "../api-creds";

const imagesToShow = 10;

export default function Home() {
  const [searchBy, setSearhBy] = useState("mountains");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState("");

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
          setCurrentPage(page);
          photos.length
            ? setImages([...images, ...res.response.results])
            : setImages(res.response.results);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return <h1>hello</h1>;
}
