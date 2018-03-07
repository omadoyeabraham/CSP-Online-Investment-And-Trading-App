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

 let objectHasNodata = (objectToTest) => {
     let keys = Object.keys(objectToTest)
     return (keys.length == 0)
 }

 /**
  * Determine if a user is accessing the application via a mobile browser
  *
  * @return boolean
  */
 let isMobileUser = () => {
  return true
 }

 /**
  * Ensure that the data passed in is an array. In cases of objects, convert to an Array of one object
  *
  * @param data
  * return Array<objects>
  */
 let ensureDataIsAnArray = (data) => {
   if (typeof data === 'object' && !Array.isArray(data)) {

      // Data is an object
      return [data]
   }

   // Data is an array
   return data
 }


 export default {
   getDefaultCashStatementStartDate,
   getDefaultCashStatementEndDate,
   objectHasNodata,
   isMobileUser,ensureDataIsAnArray
 }
