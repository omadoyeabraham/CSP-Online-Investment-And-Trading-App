/**
 * This service defines all the URL endpoints used in the application, so there is a single source * of truth if they need to be changed.
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail.com>
 */

// export const BaseApiUrl = 'http://127.0.0.1/cardinalstone-apps/restserver/public/index.php/api';
// export const BaseApiUrl = 'https://restserverstaging.cardinalstone.com/api';
// export const BaseApiUrl = "http://127.0.0.1:4059/api";
export const BaseApiUrl = 'https://restserver2.cardinalstone.com/api';
// export const BaseApiUrl = 'http://localhost/projects/webapps/apis/restserver/public/index.php/api'
// export const BaseApiUrl = 'https://restserver.cardinalstone.com/api';
// export const BaseApiUrl = 'https://restserver.cardinalstone.com/public/index.php/api';

export const AuthenticationUrl = `${BaseApiUrl}/findCustomerByName`;
export const FindUserByUsername = `${BaseApiUrl}/findCustomerByUsername`;
export const SendPasswordResetLink = `${BaseApiUrl}/sendPasswordResetLink`;
export const VerifyPasswordResetCode = `${BaseApiUrl}/verifyPasswordResetCode`;
export const LogoutUrl = `${BaseApiUrl}/logout`;

// Stockbroking
export const GetTradeOrdersUrl = `${BaseApiUrl}/findCustomerOrders`;
export const GetMarketDataUrl = `${BaseApiUrl}/getSecurity`;
export const GetTradeOrderTerms = `${BaseApiUrl}/findActiveTradeOrderTerms`;
export const GetSecurityNames = `${BaseApiUrl}/getSecurityNames`;
export const GetSecurityMarketSnapShot = `${BaseApiUrl}/findSecurityOverviewByName`;
export const GetSecurityStatusInfo = `${BaseApiUrl}/findSecurityOverviewByName`;
export const PreviewTradeOrder = `${BaseApiUrl}/getTradeOrderTotal`;
export const CreateTradeOrder = `${BaseApiUrl}/createTradeOrder`;
export const CancelTradeOrder = `${BaseApiUrl}/cancelTradeOrder`;

// WatchList
export const GetWatchListUrl = `${BaseApiUrl}/getWatchList`;
export const CreateWatchListUrl = `${BaseApiUrl}/createWatchList`;
export const UpdateWatchListUrl = `${BaseApiUrl}/updateWatchList`;
export const DeleteWatchListUrl = `${BaseApiUrl}/deleteWatchList`;
export const ToggleWatchListUrl = `${BaseApiUrl}/toggleWatchList`;

// Dashboard
export const GetDashboardDataUrl = `${BaseApiUrl}/getDashboardData`;

// CashAccounts
export const GetCashAccountStatements = `${BaseApiUrl}/findFiAcctLedgerEntriesByAccountNumber`;

// Account Funding
export const GetPaymentTransactionDetails = `${BaseApiUrl}/getPaymentTransactionDetails`;

// Customer data
export const GetCustomerData = `${BaseApiUrl}/findCustomerById`;

// Reset Password
export const ResetPassword = `${BaseApiUrl}/resetPassword`;
export const ChangePassword = `${BaseApiUrl}/changePassword`;

// Contact Manager
export const ContactManager = `${BaseApiUrl}/contactManager`;
