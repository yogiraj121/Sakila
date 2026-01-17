// src/graphql/queries.js
import { gql } from "@apollo/client";

export const GET_TOP_RENTED_FILMS = gql`
  query ($storeId: Int, $startDate: Date, $endDate: Date) {
    getTopRentedFilms(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
      title
      rentalCount
    }
  }
`;

export const GET_REVENUE_DISTRIBUTION = gql`
  query ($storeId: Int, $startDate: Date, $endDate: Date) {
    getRevenueByCategory(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
      category
      revenue
    }
  }
`;

export const GET_TOP_CUSTOMERS = gql`
  query ($storeId: Int, $startDate: Date, $endDate: Date) {
    getTopCustomers(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
      customer
      totalSpent
      totalRentals
    }
  }
`;

export const GET_KEY_METRICS = gql`
  query ($storeId: Int, $startDate: Date, $endDate: Date) {
    getKeyMetrics(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
      totalRevenue
      activeRentals
    }
  }
`;

export const GET_RECENT_TRANSACTIONS = gql`
  query ($storeId: Int, $startDate: Date, $endDate: Date) {
    getRecentTransactions(storeId: $storeId, startDate: $startDate, endDate: $endDate) {
      customerName
      title
      amount
      paymentDate
    }
  }
`;
