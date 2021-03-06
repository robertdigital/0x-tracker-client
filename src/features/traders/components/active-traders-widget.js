import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const ActiveTradersWidget = ({ className, period, traderCount }) => (
  <StatWidget className={className} period={period} title="Active Traders">
    {_.isNumber(traderCount)
      ? numeral(traderCount).format('0,0')
      : loadingIndicator}
  </StatWidget>
);

ActiveTradersWidget.propTypes = {
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  traderCount: PropTypes.number,
};

ActiveTradersWidget.defaultProps = {
  className: undefined,
  period: undefined,
  traderCount: undefined,
};

export default ActiveTradersWidget;
