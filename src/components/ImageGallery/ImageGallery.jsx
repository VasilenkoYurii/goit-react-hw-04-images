import PropTypes from 'prop-types';
import {
  ImageGalleryUl,
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGallery.styled';

export const ImageGallery = ({ hits, openModal }) => {
  return (
    <ImageGalleryUl>
      {hits &&
        hits.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItemLi
              key={id}
              onClick={() => {
                openModal(largeImageURL);
              }}
            >
              <ImageGalleryItemImage src={webformatURL} alt={id} />
            </ImageGalleryItemLi>
          );
        })}
    </ImageGalleryUl>
  );
};

ImageGallery.prototype = {
  hits: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
