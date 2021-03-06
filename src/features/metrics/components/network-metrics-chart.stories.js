import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import subDays from 'date-fns/subDays';

import { TIME_PERIOD } from '../../../constants';
import NetworkMetricsChart from './network-metrics-chart';

const sampleData = _.times(31, index => {
  const date = subDays(new Date(), index);
  date.setUTCHours(0, 0, 0, 0);

  return {
    date,
    fillCount: _.random(600, 25000),
    fillVolume: _.random(100000, 19000000),
    protocolFees: _.random(150, 4500),
    protocolFeesETH: _.random(10, 30).toString(),
    tradeCount: _.random(450, 15000),
    tradeVolume: _.random(75000, 11000000),
  };
});

storiesOf('Charts|NetworkMetricsChart', module)
  .addDecorator(getStory => (
    <div css="width: 600px; height: 300px;">{getStory()}</div>
  ))
  .add('fill volume (default)', () => (
    <NetworkMetricsChart
      currency="USD"
      data={sampleData}
      period={TIME_PERIOD.MONTH}
    />
  ))
  .add('fill volume (GBP)', () => (
    <NetworkMetricsChart
      currency="GBP"
      data={sampleData}
      period={TIME_PERIOD.MONTH}
    />
  ))
  .add('fill count', () => (
    <NetworkMetricsChart
      currency="USD"
      data={sampleData}
      period={TIME_PERIOD.MONTH}
      type="fillCount"
    />
  ))
  .add('trade volume', () => (
    <NetworkMetricsChart
      currency="USD"
      data={sampleData}
      period={TIME_PERIOD.MONTH}
      type="tradeVolume"
    />
  ))
  .add('trade count', () => (
    <NetworkMetricsChart
      currency="USD"
      data={sampleData}
      period={TIME_PERIOD.MONTH}
      type="tradeCount"
    />
  ))
  .add('protocol fees', () => (
    <NetworkMetricsChart
      currency="USD"
      data={sampleData}
      period={TIME_PERIOD.MONTH}
      type="protocolFees"
    />
  ))
  .add('without any data', () => (
    <NetworkMetricsChart currency="USD" data={[]} period={TIME_PERIOD.MONTH} />
  ));
