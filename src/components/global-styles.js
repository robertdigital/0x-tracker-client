import { createGlobalStyle } from 'styled-components';

import { colors } from '../styles/constants';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Monda');

  #root {
    min-height: 100vh;
  }

  html,
  body {
    background-color: none;
    font-size: 15px;
  }
  
  body {
    color: ${colors.violet};
    font-family: -apple-system,BlinkMacSystemFont,segoe ui,roboto,oxygen,ubuntu,cantarell,fira sans,droid sans,helvetica neue,sans-serif;
  }

  .table {
    border-bottom: 2px solid ${colors.athensGray};
    color: currentColor;
    margin: 0;
  }

  .table td {
    border-bottom: 1px solid ${colors.athensGray};
    border: none;
    padding: 0.5rem 0;
  }
  
  .table thead th {
    background-color: ${colors.indigo};
    border-bottom: 3px solid ${colors.mystic};
    border-top: none;
    color: ${colors.white};
    padding: 1rem;
    font-weight: normal;
  }
  
  .table tbody td,
  .table thead th {
    white-space: nowrap;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .table tbody tr:nth-child(2n+1) {
    background-color: rgba(14,30,37,.02);
  }
  
  .table tbody td:first-child,
  .table thead th:first-child {
    padding-left: 2rem;
  }
  
  .table tbody td:last-child,
  .table thead th:last-child {
    padding-right: 2rem;
  }

  .table .faded,
  .table .faded a {
    color: ${colors.santasGray};
  }

  .table .faded img {
    opacity: 0.5;
  }

  .card-header .nav-tabs .nav-link:hover:not(.active) {
    border-color: transparent;
  }

  .text-muted a {
    color: currentColor;
  }

  .modal-backdrop.show {
    opacity: 0.8;
  }
`;

export default GlobalStyles;
