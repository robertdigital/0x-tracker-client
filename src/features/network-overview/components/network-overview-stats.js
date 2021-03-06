import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveTradersWidget from '../../traders/components/active-traders-widget';
import FillVolumeWidget from '../../fills/components/fill-volume-widget';
import sharedPropTypes from '../../../prop-types';
import TradeCountWidget from '../../fills/components/trade-count-widget';
import TradeVolumeWidget from '../../fills/components/trade-volume-widget';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';

// Carousel gets loaded lazily because it relies on react-slick
const AsyncNetworkOverviewStatsCarousel = React.lazy(() =>
  import('./network-overview-stats-carousel'),
);

const NetworkOverviewStats = ({ className, period }) => {
  const [networkStats] = useNetworkStats({ period });
  const [traderStats] = useTraderStats({ period });
  const breakpoint = useCurrentBreakpoint();

  const fillVolume = _.get(networkStats, 'fillVolume');
  const tradeCount = _.get(networkStats, 'tradeCount');
  const traderCount = _.get(traderStats, 'traderCount');
  const tradeVolume = _.get(networkStats, 'tradeVolume');

  return breakpoint.greaterThan('md') ? (
    <Row className={className}>
      <Col lg={3} md={6}>
        <FillVolumeWidget fillVolume={fillVolume} />
      </Col>
      <Col lg={3} md={6}>
        <TradeVolumeWidget volume={tradeVolume} />
      </Col>
      <Col lg={3} md={6}>
        <TradeCountWidget tradeCount={tradeCount} />
      </Col>
      <Col lg={3} md={6}>
        <ActiveTradersWidget traderCount={traderCount} />
      </Col>
    </Row>
  ) : (
    <AsyncNetworkOverviewStatsCarousel
      className={className}
      fillVolume={fillVolume}
      tradeCount={tradeCount}
      traderCount={traderCount}
      tradeVolume={tradeVolume}
    />
  );
};

NetworkOverviewStats.propTypes = {
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod.isRequired,
};

NetworkOverviewStats.defaultProps = {
  className: undefined,
};

export default NetworkOverviewStats;
