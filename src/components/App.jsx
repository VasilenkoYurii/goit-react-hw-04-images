import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

const API_KEY = '33687717-ba072cce310c3fac718a1e690';

export function App() {
  const [hits, setHits] = useState(null);
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (request === '') {
      return;
    }
    const fethRequest = async () => {
      try {
        setLoading(true);
        setHits(null);
        setPage(1);

        const respons = await axios.get(
          `https://pixabay.com/api/?q=${request}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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
          setHits(filteredData);
          setLoading(false);
          setShowButton(false);
          setButtonLoading(false);
          return;
        }

        if (filteredData.length < 12) {
          setHits(filteredData);
          setLoading(false);
          setShowButton(false);
          setButtonLoading(false);
          return;
        }
        setHits(filteredData);
        setLoading(false);
        setShowButton(true);
        setButtonLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fethRequest();
  }, [request]);

  const handleSubmit = word => {
    if (word.toLowerCase().trim() === '') {
      toast.error('🦄 Enter a query!');
      return;
    }
    setRequest(word.toLowerCase().trim());
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      if (nextPage === 1) {
        return;
      }
      setButtonLoading(true);
      const respons = await axios.get(
        `https://pixabay.com/api/?q=${request}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const responceHits = respons.data.hits;
      const filteredData = responceHits.map(
        ({ id, largeImageURL, webformatURL }) => ({
          id,
          largeImageURL,
          webformatURL,
        })
      );
      const newHits = [...hits, ...filteredData];

      if (filteredData.length < 12) {
        setHits(newHits);
        setLoading(false);
        setShowButton(false);
        return;
      }

      setHits(newHits);
      setButtonLoading(false);
      setShowButton(true);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = image => {
    setLargeImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImage('');
    setShowModal(false);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader size={80} />}
      <ImageGallery hits={hits} openModal={openModal} />
      {showButton &&
        !loading &&
        request !== '' &&
        (buttonLoading ? (
          <Loader size={40} />
        ) : (
          <ButtonMore loadMore={loadMore} />
        ))}
      <ToastContainer />
      {showModal && <Modal closeModal={closeModal} largeImage={largeImage} />}
    </div>
  );
}
