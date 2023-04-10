import PropTypes from 'prop-types';
import { Blocks } from 'react-loader-spinner';

export const Loader = ({ size }) => {
  return <Blocks visible={true} height={size} width={size} />;
};

Loader.prototype = {
  size: PropTypes.number.isRequired,
};
