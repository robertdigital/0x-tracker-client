import PropTypes from 'prop-types';

import { TOKEN_TYPE } from './constants';

const tokenShape = {
  address: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  lastTrade: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    id: PropTypes.string.isRequired,
  }),
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  symbol: PropTypes.string.isRequired,
};

const statsShape = {
  trades: PropTypes.number.isRequired,
  volume: PropTypes.object.isRequired,
};

const propTypes = {
  token: PropTypes.shape(tokenShape),
  tokenType: PropTypes.oneOf(Object.values(TOKEN_TYPE)),
  tokenWithStats: PropTypes.shape({
    ...tokenShape,
    stats: PropTypes.shape(statsShape),
  }),
};

export default propTypes;
