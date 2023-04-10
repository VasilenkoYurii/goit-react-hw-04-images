import PropTypes from 'prop-types';
import { Button } from './Button.styled';

export const ButtonMore = ({ loadMore }) => {
  return <Button onClick={loadMore}>Load more</Button>;
};

ButtonMore.prototype = {
  loadMore: PropTypes.func.isRequired,
};
