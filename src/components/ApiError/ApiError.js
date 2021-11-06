import imageError from "./error.jpg";
import s from "./ApiError.module.css";

function ApiError({ onError }) {
  return (
    <div className={s.container}>
      <img src={imageError} alt="error"></img>
      <h2 className={s.title}>{onError}</h2>
    </div>
  );
}

export default ApiError;
