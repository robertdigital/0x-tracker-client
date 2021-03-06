import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatDate from '../../../util/format-date';
import formatTokenAmount from '../../../util/format-token-amount';

const TokenVolumeTooltip = ({ localCurrency, payload, tokenSymbol }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, localizedVolume, tokenVolume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: `volume (${localCurrency})`,
          value: formatCurrency(localizedVolume, localCurrency),
        },
        {
          label: `volume (${tokenSymbol || 'token'})`,
          value:
            tokenVolume !== null ? formatTokenAmount(tokenVolume) : 'Unknown',
        },
      ]}
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

TokenVolumeTooltip.propTypes = {
  localCurrency: PropTypes.string.isRequired,
  payload: PropTypes.array,
  tokenSymbol: PropTypes.string.isRequired,
};

TokenVolumeTooltip.defaultProps = {
  payload: undefined,
};

export default TokenVolumeTooltip;
