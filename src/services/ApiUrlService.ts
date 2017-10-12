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
export const GetTradeOrderTerms = `${BaseApiUrl}/findActiveTradeOrderTerms`;
export const GetSecurityNames = `${BaseApiUrl}/getSecurityNames`;
export const GetSecurityMarketSnapShot = `${BaseApiUrl}/findSecurityOverviewByName`;
export const GetSecurityStatusInfo = `${BaseApiUrl}/findSecurityOverviewById`;
export const PreviewTradeOrder = `${BaseApiUrl}/getTradeOrderTotal`;
export const CreateTradeOrder = `${BaseApiUrl}/createTradeOrder`;

// WatchList
export const GetWatchListUrl = `${BaseApiUrl}/getWatchList`;
export const CreateWatchListUrl = `${BaseApiUrl}/createWatchList`;
export const UpdateWatchListUrl = `${BaseApiUrl}/updateWatchList`;
export const DeleteWatchListUrl = `${BaseApiUrl}/deleteWatchList`;
export const ToggleWatchListUrl = `${BaseApiUrl}/toggleWatchList`;

// Dashboard
export const GetDashboardDataUrl = `${BaseApiUrl}/getDashboardData`;

// CashAccounts
export const GetCashAccountStatements = `${BaseApiUrl}/findFiAcctLedgerEntriesByAccountNumber`

// Account Funding
export const GetPaymentTransactionDetails = `${BaseApiUrl}/getPaymentTransactionDetails`
