import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import ApiError from "../ApiError";
import Modal from "../Modal";
import Button from "../Button";
import Idle from "../Idle";
import Loader from "../Loader";
import s from "./ImageGallery.module.css";
require('dotenv').config()

class ImageGallery extends Component {
  state = {
    gallary: null,
    loader: false,
    error: null,
    status: "idle",
    modalSrc: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevProp = prevProps.inquiry;
    const newProp = this.props.inquiry;
    const key = process.env.REACT_APP_API_KEY;
    const prevPage = prevState.page;
    const { page } = this.state;

    if (prevProp !== newProp) {
      const pg = 1;
      this.setState({ status: "pending", page: 1 });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${newProp}&page=${pg}&key=${key}&image_type=photo&orientation=horizontal&per_page=15`
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(
              new Error(
                `uneasy request. under request ${newProp} no photo found`
              )
            );
          })
          .then((photo) =>
            this.setState({ gallary: photo.hits, status: "resolved" })
          )
          .catch((error) =>
            this.setState({ error: error, status: "rejected" })
          );
      }, 1000);
    }

    if (prevPage !== page) {
      fetch(
        `https://pixabay.com/api/?q=${newProp}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=15`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`uneasy request. under request ${newProp} no photo found`)
          );
        })
        .then((photo) => {
          if (prevPage !== page) {
            const glPhoto = photo.hits;
            this.setState((prevState) => ({
              gallary: [...prevState.gallary, ...glPhoto],
              status: "resolved",
            }));
          }

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        })
        .catch((error) => this.setState({ error: error, status: "rejected" }));
    }
  }

  handlerModal = (idComp) => {
    this.setState({
      modalSrc: this.state.gallary.find((photo) => photo.id === idComp),
    });
  };

  closeModal = () => {
    this.setState({ modalSrc: null });
  };

  scrollLandMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { gallary, error, status, modalSrc } = this.state;
    // const { inquiry } = this.props;

    if (status === "idle") {
      return <Idle title="Enter request"></Idle>;
    }

    if (status === "pending") {
      return <Loader></Loader>;
    }

    if (status === "rejected") {
      return <ApiError onError={error.message}></ApiError>;
    }

    if (status === "resolved") {
      return (
        <>
          {gallary.length > 0 ? (
            <ul className={s.ImageGallery}>
              {gallary && (
                <ImageGalleryItem
                  gallary={gallary}
                  onClickModal={this.handlerModal}
                ></ImageGalleryItem>
              )}
            </ul>
          ) : (
            <ApiError onError="photo not found"></ApiError>
          )}

          {gallary.length > 0 && (
            <Button onClick={this.scrollLandMore}></Button>
          )}
          {modalSrc && (
            <Modal modalSrc={modalSrc} closeModal={this.closeModal}></Modal>
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
