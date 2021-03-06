import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import RelayerImage from './relayer-image';
import RelayerLink from './relayer-link';
import relayersPropTypes from '../prop-types';

const TableCell = styled.td`
  padding-bottom: 1rem;
`;

const TableRow = styled.tr`
  &:last-child ${TableCell} {
    padding-bottom: 0;
  }
`;

const SecondaryText = styled.span`
  color: ${colors.stormGray};
  font-size: 0.9rem;
`;

const TopRelayersTable = ({ relayers }) => {
  const breakpoint = useCurrentBreakpoint();

  return (
    <table css="width: 100%;">
      <thead css="display: none;">
        <tr>
          <th colSpan="2">Token</th>
          <th>Fill Volume</th>
        </tr>
      </thead>
      <tbody>
        {relayers.map(relayer => (
          <TableRow key={relayer.id}>
            <TableCell css="padding-right: 1.25rem;">
              <RelayerImage imageUrl={relayer.imageUrl} size="2.5rem" />
            </TableCell>
            <TableCell width="99%;">
              <RelayerLink css="font-weight: 500;" relayer={relayer.slug}>
                {relayer.name}
              </RelayerLink>
              {relayer.url !== undefined ? (
                <>
                  <br />
                  <SecondaryText as={Link} href={relayer.url}>
                    {_.truncate(relayer.url, {
                      length: breakpoint.greaterThan('xs') ? 35 : 25,
                    })}
                  </SecondaryText>
                </>
              ) : null}
            </TableCell>
            <TableCell css="text-align: right;">
              <LocalisedAmount
                amount={relayer.stats.tradeVolume}
                css="font-weight: 500;"
                summarize
              />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};

TopRelayersTable.propTypes = {
  relayers: PropTypes.arrayOf(relayersPropTypes.relayerWithStats).isRequired,
};

export default TopRelayersTable;
