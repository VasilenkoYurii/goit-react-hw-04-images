import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, MainModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImage }) => {
  return createPortal(
    <Overlay
      onClick={() => {
        closeModal();
      }}
    >
      <MainModal>
        <img src={largeImage} alt="your request" />
      </MainModal>
    </Overlay>,
    modalRoot
  );
};

Modal.prototype = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
