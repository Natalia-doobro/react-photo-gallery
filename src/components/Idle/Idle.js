import pointer from "./pointer.jpg";
import s from "./Idle.module.css";

const Idle = ({ title }) => {
  return (
    <div className={s.container}>
      <img src={pointer} alt="pointer" width="600"></img>
      <h2 className={s.title}>{title}</h2>
    </div>
  );
};
export default Idle;
