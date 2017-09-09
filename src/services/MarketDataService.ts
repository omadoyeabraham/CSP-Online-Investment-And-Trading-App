/**
 * This service interacts with the CardinalStone API to retreive various market data, including
 * top gainers/losers , data for NSE ASI graph, full market data (for market data page)
 *
 * @author Omadoye Abraham <omadoyeabraham@gmail>
 */

 // List of daily equity top gainers
 export const topGainers = [
  {name: 'PRESCO', change: 14.56},
  {name: 'ETI', change: 10.55},
  {name: 'FBNH', change: 5.56},
  {name: 'DIAMOND', change: 4.56},
  {name: 'GTB', change: 2.56}
 ];

 // List of daily equity top losers
 export const topLosers = [
  {name: 'PRESCO', change: 14.56},
  {name: 'ETI', change: 10.55},
  {name: 'FBNH', change: 5.56},
  {name: 'DIAMOND', change: 4.56},
  {name: 'GTB', change: 2.56}
 ];

 // Treasury bills data
 export const treasuryBills = [
  {name: '360 DAY TBILL', yield: 22.23},
  {name: '180 DAY TBILL', yield: 20.23},
  {name: '90 DAY TBILL', yield: 18.23}
 ];

 // Bonds data
 export const bonds = [
  {name: '20 YR BOND', yield: 22.23},
  {name: '10 YR BOND', yield: 20.23},
  {name: '5 YR BOND', yield: 18.23}
 ];
