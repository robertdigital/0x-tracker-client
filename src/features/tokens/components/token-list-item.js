import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from '../../../constants';
import { colors } from '../../../styles/constants';
import FillLink from '../../fills/components/fill-link';
import formatDate from '../../../util/format-date';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import TokenImage from './token-image';
import TokenLink from './token-link';
import TokenListItemVolume from './token-list-item-volume';

const LastTradeLink = styled(FillLink)`
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const truncateAddress = address =>
  `${address.slice(0, 15)}...${address.slice(address.length - 15)}`;

// TODO: Encapsulate this in a reusable component and use on fill page
const AssetTypeBadge = styled.span.attrs(props => ({
  className: `badge badge-${props.children === 'ERC-721' ? 'success' : 'dark'}`,
}))`
  color: white;
`;

const TokenListItem = ({ position, token }) => (
  <tr>
    <td className="align-middle">{position}</td>
    <td className="align-middle">
      <TokenLink address={token.address}>
        <TokenImage imageUrl={token.imageUrl} />
      </TokenLink>
    </td>
    <td width="99%">
      <TokenLink address={token.address}>
        {token.name || 'Unknown Token'}
      </TokenLink>
      <br />
      {token.symbol || truncateAddress(token.address)}
    </td>
    <td className="align-middle">
      <AssetTypeBadge>{token.type.toUpperCase()}</AssetTypeBadge>
    </td>
    <td className="align-middle" css="text-align: right;">
      {_.has(token, 'price.last') && token.type === 'erc-20' ? (
        <LastTradeLink fillId={token.lastTrade.id}>
          <LocalisedAmount amount={token.price.last} />
          <br />
          <span
            css={`
              font-size: 0.8rem;
              color: ${colors.stormGray};
            `}
          >
            {formatDate(token.lastTrade.date, DATE_FORMAT.RELATIVE)}
          </span>
        </LastTradeLink>
      ) : (
        '-'
      )}
    </td>
    <td className="align-middle" css="text-align: right;">
      <Number>{token.stats.fillCount}</Number>
    </td>
    <td className="align-middle" css="text-align: right;">
      <TokenListItemVolume token={token} />
    </td>
  </tr>
);

TokenListItem.propTypes = {
  position: PropTypes.number.isRequired,
  token: PropTypes.object.isRequired,
};

export default TokenListItem;
