import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    inquiry: "",
  };

  dataProcessingForm = (data) => {
    this.setState({ inquiry: data.name.toLowerCase() });
  };

  render() {
    const { inquiry } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.dataProcessingForm}></Searchbar>
        <ImageGallery inquiry={inquiry} />
        <ToastContainer theme="colored" />
      </div>
    );
  }
}

export default App;
