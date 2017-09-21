/**
 * This service defines all the URL endpoints used in the application, so there is a single source * of truth if they need to be changed.
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

export const BaseApiUrl = 'https://restserver.cardinalstone.com/api';

export const AuthenticationUrl = `${BaseApiUrl}/findCustomerByName`;

// Stockbroking
export const GetTradeOrdersUrl = `${BaseApiUrl}/findCustomerOrders`;
export const GetMarketDataUrl = `${BaseApiUrl}/getSecurity`;

// Dashboard
export const GetDashboardDataUrl = `${BaseApiUrl}/getDashboardData`;
