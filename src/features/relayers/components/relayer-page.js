import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import buildUrl from '../../../util/build-url';
import Card from '../../../components/card';
import ChartsContainer from '../../../components/charts-container';
import Fills from '../../fills/components/fills';
import getPeriodOptions from '../../../util/get-period-options';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import RelayerMetrics from '../../metrics/components/relayer-metrics';
import useRelayer from '../hooks/use-relayer';

const StyledChartsContainer = styled(ChartsContainer)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const RelayerPage = ({ history, location, match }) => {
  const { slug } = match.params;
  const params = new URLSearchParams(location.search);
  const page = Number(params.get('page')) || 1;

  const [relayer, loadingRelayer] = useRelayer(slug);

  const onPageChange = useCallback(newPage => {
    history.push(
      buildUrl(match.url, {
        page: newPage,
      }),
    );
  }, []);

  if (loadingRelayer) {
    return <LoadingPage />;
  }

  if (relayer === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{relayer.name}</title>
      </Helmet>
      <PageLayout title={relayer.name}>
        <StyledChartsContainer
          charts={[
            {
              component: (
                <RelayerMetrics relayerId={relayer.id} type="tradeVolume" />
              ),
              title: 'Trade Volume',
            },
            {
              component: (
                <RelayerMetrics relayerId={relayer.id} type="tradeCount" />
              ),
              title: 'Trade Count',
            },
          ]}
          defaultPeriod={TIME_PERIOD.YEAR}
          periods={getPeriodOptions([
            TIME_PERIOD.DAY,
            TIME_PERIOD.WEEK,
            TIME_PERIOD.MONTH,
            TIME_PERIOD.YEAR,
            TIME_PERIOD.ALL,
          ])}
        />
        <Card fullHeight>
          <Fills
            excludeColumns={['relayer']}
            filter={{ relayer: relayer.id }}
            onPageChange={onPageChange}
            page={page}
          />
        </Card>
      </PageLayout>
    </>
  );
};

RelayerPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RelayerPage;
