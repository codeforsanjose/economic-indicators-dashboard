To update the data:

1) Add the latest indicators.csv file to the data folder
2) Change the name in the file data/latest_indicators.csv to be the name of the indicators file uploaded in step 1.

Notes
1) Any changes to the indicator headings will require corresponding changes to the code (e.g category, name, value, etc.)
2) change_from_prev_year values will be evaluated for negative sign to determine if the trend is down.  Values that are negative will then be stripped of the negative sign.  
3) In general whatever text is present in the field will be displayed in the dashboard.  Special processing was added to replace the TBD with an empty string in the change_from_prev_year and remove the additional quotes around some of the date values.  
4) It may take a few minutes before the new dashboard reflects any data changes as Github refresh is not always immediate.  If after five minutes, the dashboard does not reflect the latest changes - using the developer tools, see if there were any errors.  Verify that the latest_indicators.csv was updated correctly. 
