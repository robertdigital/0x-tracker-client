import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT, ETH_TOKEN, ZRX_TOKEN } from '../../../constants';
import { media } from '../../../styles/util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import AssetLabel from './asset-label';
import buildSearchUrl from '../../search/util/build-search-url';
import EthereumAddressLink from '../../../components/ethereum-address-link';
import fillsPropTypes from '../prop-types';
import FillAssetsList from './fill-assets-list';
import FillDetail from './fill-detail';
import FillFeesList from './fill-fees-list';
import FillRelayerLink from './fill-relayer-link';
import FillStatusLabel from './fill-status-label';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';
import LocalisedAmount from '../../currencies/components/localised-amount';
import SearchLink from '../../search/components/search-link';
import TokenAmount from '../../tokens/components/token-amount';
import TraderLink from '../../traders/components/trader-link';

const FillDetailList = styled.dl`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.greaterThan('md')`
    display: flex;
    flex-wrap: wrap;
  `};
`;

const PriceBadge = styled.span.attrs({ className: 'badge' })`
  background-color: ${colors.mystic};
  margin-left: 0.5rem;
`;

const FillDetails = ({ fill }) => {
  const breakpoint = useCurrentBreakpoint();
  const assetsWithPrices = _.filter(fill.assets, asset =>
    _.isObject(asset.price),
  );
  const bridgedAsset = _.find(
    fill.assets,
    asset => asset.bridgeAddress !== undefined,
  );

  return (
    <FillDetailList>
      <FillDetail title="Transaction Hash">
        <Link href={`https://etherscan.io/tx/${fill.transactionHash}`}>
          {fill.transactionHash}
        </Link>
      </FillDetail>

      <FillDetail title="Order Hash">
        <Link href={buildSearchUrl(fill.orderHash)}>{fill.orderHash}</Link>
      </FillDetail>

      {fill.senderAddress && (
        <FillDetail title="Sender Address">
          <SearchLink searchQuery={fill.senderAddress}>
            {fill.senderAddress}
          </SearchLink>
        </FillDetail>
      )}

      <FillDetail title="Date">
        {formatDate(fill.date, DATE_FORMAT.FULL)}
      </FillDetail>

      <FillDetail title="Relayer">
        <FillRelayerLink fill={fill} showImage />
      </FillDetail>

      <FillDetail title="Status">
        <FillStatusLabel status={fill.status} />
      </FillDetail>

      <FillDetail title="0x Protocol">v{fill.protocolVersion}</FillDetail>

      {_.has(fill.value, 'USD') && (
        <FillDetail title="Value">
          <LocalisedAmount amount={fill.value.USD} />
        </FillDetail>
      )}

      <FillDetail title="Maker Address">
        <TraderLink address={fill.makerAddress}>{fill.makerAddress}</TraderLink>
      </FillDetail>

      <FillDetail title="Taker Address">
        <TraderLink address={fill.takerAddress}>{fill.takerAddress}</TraderLink>
      </FillDetail>

      <FillDetail title="Maker Assets">
        <FillAssetsList
          assets={_.filter(fill.assets, { traderType: 'maker' })}
          condensed={breakpoint.lessThan('sm')}
        />
      </FillDetail>

      <FillDetail title="Taker Assets">
        <FillAssetsList
          assets={_.filter(fill.assets, { traderType: 'taker' })}
          condensed={breakpoint.lessThan('sm')}
        />
      </FillDetail>

      {bridgedAsset !== undefined && (
        <FillDetail title="Asset Bridge">
          <EthereumAddressLink address={bridgedAsset.bridgeAddress}>
            {bridgedAsset.bridgeName || bridgedAsset.bridgeAddress}
          </EthereumAddressLink>
        </FillDetail>
      )}

      <FillDetail title="Derived Prices">
        {assetsWithPrices.length === 0 ? (
          'None'
        ) : (
          <List>
            {assetsWithPrices.map(asset => (
              <ListItem key={`${asset.tokenAddress}-${asset.tokenId}`}>
                <AssetLabel asset={asset} />
                <PriceBadge>
                  <LocalisedAmount amount={asset.price.USD} />
                </PriceBadge>
              </ListItem>
            ))}
          </List>
        )}
      </FillDetail>

      {fill.makerFee !== undefined && (
        <FillDetail title="Maker Fee">
          {fill.makerFee.ZRX !== '0' ? (
            <TokenAmount amount={fill.makerFee.ZRX} token={ZRX_TOKEN} />
          ) : (
            'None'
          )}
        </FillDetail>
      )}

      {fill.takerFee !== undefined && (
        <FillDetail title="Taker Fee">
          {fill.takerFee.ZRX !== '0' ? (
            <TokenAmount amount={fill.takerFee.ZRX} token={ZRX_TOKEN} />
          ) : (
            'None'
          )}
        </FillDetail>
      )}

      {fill.totalFees !== undefined && fill.totalFees.ZRX !== '0' && (
        <FillDetail title="Total Fees">
          <TokenAmount amount={fill.totalFees.ZRX} token={ZRX_TOKEN} />
        </FillDetail>
      )}

      {fill.fees !== undefined && (
        <>
          <FillDetail title="Maker Fees">
            <FillFeesList
              condensed={breakpoint.lessThan('sm')}
              fees={_.filter(fill.fees, { traderType: 'maker' })}
            />
          </FillDetail>

          <FillDetail title="Taker Fees">
            <FillFeesList
              condensed={breakpoint.lessThan('sm')}
              fees={_.filter(fill.fees, { traderType: 'taker' })}
            />
          </FillDetail>
        </>
      )}

      <FillDetail title="Fee Recipient">
        <EthereumAddressLink address={fill.feeRecipient}>
          {fill.feeRecipient}
        </EthereumAddressLink>
      </FillDetail>

      {fill.protocolFee !== undefined ? (
        <FillDetail title="Protocol Fee">
          <TokenAmount
            amount={fill.protocolFee.ETH}
            linked={false}
            token={ETH_TOKEN}
          />
          {fill.protocolFee.USD !== undefined ? (
            <PriceBadge>
              <LocalisedAmount amount={fill.protocolFee.USD} />
            </PriceBadge>
          ) : null}
        </FillDetail>
      ) : null}
    </FillDetailList>
  );
};

FillDetails.propTypes = {
  fill: fillsPropTypes.fill.isRequired,
};

export default FillDetails;
