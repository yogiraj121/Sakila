import { gql } from 'apollo-server';
import { pool } from './db.js';
import {
  topRentedFilmsQuery,
  revenueByCategoryQuery,
  topCustomersQuery,
  keyMetricsQuery,
  recentTransactionsQuery
} from './queries/index.js';

export const typeDefs = gql`
  scalar Date

  type KeyMetrics {
    totalRevenue: Float
    activeRentals: Int
  }

  type FilmRevenue {
    title: String
    rentalCount: Int
  }

  type CategoryRevenue {
    category: String
    revenue: Float
  }

  type CustomerRevenue {
    customer: String
    totalSpent: Float
    totalRentals: Int
  }

  type Transaction {
    paymentId: ID
    customerName: String
    title: String
    amount: Float
    paymentDate: Date
  }

  type Query {
    getTopRentedFilms(storeId: Int, startDate: Date, endDate: Date): [FilmRevenue]
    getRevenueByCategory(storeId: Int, startDate: Date, endDate: Date): [CategoryRevenue]
    getTopCustomers(storeId: Int, startDate: Date, endDate: Date): [CustomerRevenue]
    getKeyMetrics(storeId: Int, startDate: Date, endDate: Date): KeyMetrics
    getRecentTransactions(storeId: Int, startDate: Date, endDate: Date): [Transaction]
  }
`;

export const resolvers = {
  Query: {
    getTopRentedFilms: async (_, { storeId, startDate, endDate }) => {
      const [rows] = await pool.query(topRentedFilmsQuery, [startDate, endDate, storeId, storeId]);
      return rows;
    },
    getRevenueByCategory: async (_, { storeId, startDate, endDate }) => {
      const [rows] = await pool.query(revenueByCategoryQuery, [startDate, endDate, storeId, storeId]);
      return rows;
    },
    getTopCustomers: async (_, { storeId, startDate, endDate }) => {
      const [rows] = await pool.query(topCustomersQuery, [startDate, endDate, storeId, storeId]);
      return rows;
    },
    getKeyMetrics: async (_, { storeId, startDate, endDate }) => {
      const [rows] = await pool.query(keyMetricsQuery, [startDate, endDate, storeId, storeId]);
      return rows[0];
    },
    getRecentTransactions: async (_, { storeId, startDate, endDate }) => {
      const [rows] = await pool.query(recentTransactionsQuery, [startDate, endDate, storeId, storeId]);
      return rows;
    },
  },
};
