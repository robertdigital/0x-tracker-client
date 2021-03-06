import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import Container from './container';

const Inner = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.mystic};
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;

  ${media.greaterThan('sm')`
    border: none;
    padding: 0;
  `};
`;

const Title = styled.h1`
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 1.2rem;
  margin: 0;
  word-break: break-all;
`;

const FilterContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;

const PageTitleBlock = ({ children, title }) => (
  <Container>
    <Inner>
      <Title>{title}</Title>
      {children ? <FilterContainer>{children}</FilterContainer> : null}
    </Inner>
  </Container>
);

PageTitleBlock.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
};

PageTitleBlock.defaultProps = {
  children: undefined,
};

export default PageTitleBlock;
