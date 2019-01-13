import { ChevronLeft as LeftArrowIcon } from 'styled-icons/fa-solid/ChevronLeft.cjs';
import { ChevronRight as RightArrowIcon } from 'styled-icons/fa-solid/ChevronRight.cjs';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import PagingSummary from './paging-summary';
import LoadingIndicator from './loading-indicator';

const StyledMobilePaginator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PageButton = styled.button.attrs({ type: 'button' })`
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  flex-grow: 0;
  padding: 1rem 1.25rem;

  &:hover {
    background-color: ${colors.athensGray};
  }

  &:disabled {
    color: ${colors.mischka};

    &:hover {
      background: none;
      cursor: initial;
    }
  }
`;

const PageInfo = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  font-weight: bold;
  height: 100%;
  justify-content: center;
`;

const MobilePaginator = ({
  changingPage,
  onPageChange,
  page,
  pageCount,
  pageSize,
  recordCount,
}) => (
  <StyledMobilePaginator>
    <PageButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
      <LeftArrowIcon width={12} />
    </PageButton>
    <PageInfo>
      {changingPage ? (
        <LoadingIndicator size="medium" type="cylon" />
      ) : (
        <PagingSummary
          compact
          css="font-weight: bold;"
          page={page}
          pageCount={page}
          pageSize={pageSize}
          recordCount={recordCount}
        />
      )}
    </PageInfo>
    <PageButton
      disabled={page === pageCount}
      onClick={() => onPageChange(page + 1)}
    >
      <RightArrowIcon width={12} />
    </PageButton>
  </StyledMobilePaginator>
);

MobilePaginator.propTypes = {
  changingPage: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordCount: PropTypes.number.isRequired,
};

MobilePaginator.defaultProps = {
  changingPage: false,
};

export default MobilePaginator;
