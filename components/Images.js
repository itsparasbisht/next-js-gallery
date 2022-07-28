import styles from "./images.module.css";

function Images({ images }) {
  console.log(images);
  return (
    <div className={styles.imagesContainer}>
      {images.map((image) => (
        <div key={image.id} className={styles.imageWrapper}>
          <img src={image.urls.regular} alt={image.alt_description} />
          <div className={styles.imageDetails}>what is up</div>
        </div>
      ))}
    </div>
  );
}

export default Images;
