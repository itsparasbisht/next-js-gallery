import styles from "./images.module.css";

function Images({ images }) {
  console.log(images);
  return (
    <div className={styles.imagesContainer}>
      {images.map((image) => (
        <img
          key={image.id}
          src={image.urls.regular}
          alt={image.alt_description}
        />
      ))}
    </div>
  );
}

export default Images;
