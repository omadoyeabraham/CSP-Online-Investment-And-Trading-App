/**
 * Utility functions doing generic stuff
 *
 */

 import moment from 'moment'

 /**
  * Return the default startDate for cash account searches.
  * This date is the first of the month
  * @return String
  */
 let getDefaultCashStatementStartDate = () => {
  return moment().format('YYYY-MM-01')
 }


 /**
 * Return the default endDate for cash account searches.
 * This date is today
 * @return String
 */
 let getDefaultCashStatementEndDate = () => {
   return moment().format('YYYY-MM-DD')
 }





 export default {
   getDefaultCashStatementStartDate,
   getDefaultCashStatementEndDate
 }
