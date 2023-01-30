# Getting Started with Create React App

This project shows a list of job sites with their corresponding status on the main page. By clicking on Create you will have the chance to add a new job site to this listing. By double clicking on the job site name you will be redirected to another page.

Here by choosing the category, you can see the inventory of items. By double clicking on Item's code you can update its fields.

#To run this project, press :
# npm install && npm start


#How to make this app more secure?
1.One way this app could be more secure would be by using the SNYK extension to check for vulnerabilities in dependencies.

2.Avoiding JSON injection attacks 
It is common to send JSON data along with server-side rendered React pages. It would be a good safete measure to escape < characters with a benign value to avoid injection attacks.

3.Using Linter
Linter configurations and plugins will automatically detect security issues in our code and offer remediation advice.


#Making this app a large scale project:

1.Global Store -> Redux

2.Multiple Environment files for development, staging, production process.

3.Form Handling -> react-hook-form

4.Styling -> styled-components

5.UI library -> I have used some elements from antd in this project, but on a larger scale project a further integration is needed.

6.HTTP query -> axios

7.Documentation -> react-styleguidist