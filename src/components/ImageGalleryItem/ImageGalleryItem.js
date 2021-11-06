import s from "./ImageGalleryItem.module.css";
function ImageGalleryItem({ gallary, onClickModal }) {
  return gallary.map((el) => (
    <li className={s.ImageGalleryItem} key={el.id}>
      <img
        src={el.webformatURL}
        alt={el.user}
        className={s.image}
        onClick={() => onClickModal(el.id)}
      />
    </li>
  ));
}

export default ImageGalleryItem;
