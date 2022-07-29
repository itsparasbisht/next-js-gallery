import styles from "./images.module.css";

function Images({ images }) {
  return (
    <div className={styles.imagesContainer}>
      {images.map((image) => (
        <div key={image.id} className={styles.imageWrapper}>
          <img src={image.urls.regular} alt={image.alt_description} />
          <div className={styles.imageDetails}>
            <img src={image.user.profile_image.large} alt="" />
            <h4>{image.user.instagram_username}</h4>
            <p>{image.user.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Images;
