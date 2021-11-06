import { Component } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    name: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handlerSubmit = (e) => {
    e.preventDefault();

    if (this.state.name.trim() === "") {
      return toast.error("Enter the value of your request!");
    }

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: "" });
  };

  render() {
    const { name } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handlerSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            name="name"
            value={name}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
