import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

const API_KEY = '33687717-ba072cce310c3fac718a1e690';

export class App extends Component {
  state = {
    hits: null,
    page: 1,
    request: '',
    showModal: false,
    largeImage: '',
    loading: false,
    buttonLoading: false,
    showButton: true,
  };

  async componentDidUpdate(prevProp, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest) {
      try {
        this.setState({ loading: true, hits: null, page: 1 });

        const respons = await axios.get(
          `https://pixabay.com/api/?q=${nextRequest}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const responceHits = respons.data.hits;
        const filteredData = responceHits.map(
          ({ id, largeImageURL, webformatURL }) => ({
            id,
            largeImageURL,
            webformatURL,
          })
        );

        if (filteredData.length === 0) {
          toast.error(`We couldn't find anything, please try again!`);
          this.setState({
            hits: filteredData,
            loading: false,
            showButton: false,
            buttonLoading: false,
          });
          return;
        }

        if (filteredData.length < 12) {
          this.setState({
            hits: filteredData,
            loading: false,
            showButton: false,
            buttonLoading: false,
          });
          return;
        }
        this.setState({
          hits: filteredData,
          loading: false,
          showButton: true,
          buttonLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (prevPage !== nextPage) {
      try {
        if (this.state.page === 1) {
          return;
        }
        this.setState({ buttonLoading: true });
        const respons = await axios.get(
          `https://pixabay.com/api/?q=${nextRequest}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const responceHits = respons.data.hits;
        const filteredData = responceHits.map(
          ({ id, largeImageURL, webformatURL }) => ({
            id,
            largeImageURL,
            webformatURL,
          })
        );
        const newHits = [...this.state.hits, ...filteredData];

        if (filteredData.length < 12) {
          this.setState({
            hits: newHits,
            loading: false,
            showButton: false,
          });
          return;
        }

        this.setState({
          hits: newHits,
          buttonLoading: false,
          showButton: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleSubmit(word) {
    if (word.toLowerCase().trim() === '') {
      toast.error('🦄 Enter a query!');
      return;
    }
    this.setState({ request: word.toLowerCase().trim() });
  }

  loadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  openModal = image => {
    this.setState({ largeImage: image, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImage: '', showModal: false });
  };

  render() {
    const {
      hits,
      loading,
      request,
      buttonLoading,
      showModal,
      largeImage,
      showButton,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit.bind(this)} />
        {loading && <Loader size={80} />}
        <ImageGallery hits={hits} openModal={this.openModal} />
        {showButton &&
          !loading &&
          request !== '' &&
          (buttonLoading ? (
            <Loader size={40} />
          ) : (
            <ButtonMore loadMore={this.loadMore} />
          ))}
        <ToastContainer />
        {showModal && (
          <Modal closeModal={this.closeModal} largeImage={largeImage} />
        )}
      </div>
    );
  }
}
