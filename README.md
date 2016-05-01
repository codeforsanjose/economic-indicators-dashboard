###To update the data:

1. Add the latest indicators.csv file to the data folder
2. Change the name in the file data/latest_indicators.csv to be the name of the indicators file uploaded in step 1.

####Notes

* Any changes to the indicator headings will require corresponding changes to the code (e.g category, name, value, etc.)
* change_from_prev_year values will be evaluated for negative sign to determine if the trend is down.  
  * Values that are negative will then be stripped of the negative sign for display purposes after being evaluated for the direction of the trend.  
* In general whatever text is present in the field will be displayed in the dashboard.  Special processing was added for the following cases:
  * Replace the TBD with an empty string in the change_from_prev_year
  * Remove the additional quotes around some of the date values.  
* It may take a few minutes before the new dashboard reflects any data changes as Github refresh is not always immediate.  If after five minutes, the dashboard does not reflect the latest changes, try the following:
  * Verify that the latest_indicators.csv was updated correctly. 
  * Using the developer tools, see if there were any errors.
