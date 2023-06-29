@settings
Feature: Express Manager App


    Scenario: Verify the onboarding of the Express Manager App
        Given I should see "MyMoney_Welcomelogo" icon
        And I should see "MyMoney_NextButton" button
        And I should see "MyMoney_Disclaimertext" text
        And I fetch "MyMoney_Disclaimertext" details and save as "MyMoney_Disclaimertext" inside test data
        And I compare "MyMoney_Disclaimertext" value from the app with the expected value from test data
        And I tap "MyMoney_NextButton" button
        And I tap "MyMoney_NextButton2" button
        Then I should see "MyMoney_Logoimage,MyMoney_LogoDescription,MyMoney_SendUsage_Description,MyMoney_Crashradiobutton,MyMoney_Radiobuttondescription,MyMoney_Termsofuseandprivacy" texts
        And I should see "MyMoney_StartButton,MyMoney_BackButton" buttons
        And I tap "MyMoney_StartButton" button
        Then I should see "MyMoney_Dashboardlogo" icon
        And I should see "MyMoney_Recordicon,MyMoney_Analysisicon,MyMoney_Budgeticon,MyMoney_Accountsicon,MyMoney_Categoriesicon,MyMoney_Filtericon,MyMoney_Emptyicon,MyMoney_Norecorddescription,MyMoney_CurrentDate,MyMoney_NextMonthicon,MyMoney_Previousmonthicon,MyMoney_Expenseheader,MyMoney_Incomeheader,MyMoney_Totalheader" texts
        Then I fetch "MyMoney_Norecorddescription" details and save as "MyMoney_Norecorddescription" inside test data
        And I compare "MyMoney_Norecorddescription" value from the app with the expected value from test data

    Scenario: Verification of dashboard components
        Given I should see "MyMoney_Dashboardlogo" icon
        Then I tap "MyMoney_Dashboard" icon
        And I should see "MyMoney_Appname,MyMoney_Preferencesicon,MyMoney_Exportsrecords,MyMoney_Backupandrestore,MyMoney_Deleteandreset,MyMoney_Proversion,MyMoney_Likemymoney,MyMoney_Help,MyMoney_Feedback" icons
        Then I tap "MyMoney_Searchbox" icon

    Scenario: Verification of expenses screen components
        Given I should see "MyMoney_Dashboardlogo" icon
        And I tap "MyMoney_Addanewrecordicon" icon
        Then I should see "MyMoney_CancelButton,MyMoney_SaveButton,MyMoney_AccountButton,MyMoney_CatergoryButton" texts
        And I should see "MyMoney_ExpenseCalculator" icon

    Scenario: Verification of account header
        Given I tap "MyMoney_AccountButton" button
        Then I should see "MyMoney_SelectAccountheader,MyMoney_Cardheader,MyMoney_Savingsheader,MyMoney_Addanewaccountbtn" icons
        When I tap "MyMoney_Addanewaccountbtn" button
        Then I should see "MyMoney_Addaccount" title
        And I should see "MyMoney_initialamount,MyMoney_Nametitle,MyMoney_icontitle" headers
        Then I should see "MyMoney_initialamountdisclaimer" text
        And I should see "MyMoney_icons" icons
        Then I tap "MyMoney_icon1" icon
        Then I slide the "MyMoney_icons" towards "left"

    Scenario: Adding a new account
        Given I should see "MyMoney_SelectAccountheader" header
        Then I tap "MyMoney_Addanewaccountbtn" button
        And I should see "NewAccount_Amountfield,NewAccount_Namefield" fields
        And I should see "NewAccount_CancelBtn,NewAccount_SaveBtn" buttons
        Then I tap "NewAccount_Amountfield" field
        # And I enter "MyMoneyAmount1" in "NewAccount_Amountfield" field
        Then I enter "100" in "NewAccount_Amountfield" field
        Then I tap "NewAccount_Namefield" field
        And I enter "test" in "NewAccount_Namefield" field
        Then I tap "NewAccount_SaveBtn" button
        Then I should see "MyMoney_SelectAccountheader" header
        # And I should see "test" text inside "NewAccount_nameaddded1" field
        # And I should see "100" text inside "NewAccount_amtadded1" field
        And I tap "NewAccount_nameaddded1" icon

    Scenario: Selecting a Category
        Given I should see "MyMoney_AccountButton" button
        Then I should see "MyMoney_CatergoryButton" contents
        When I tap "MyMoney_CatergoryButton" icon
        Then I should see "Category_header" header
        And I should see "Category1,Category2,Category3,Category4,Category5,Category6,Category7,Category8,Category9,Category10,Category11,Category12,Category13,Category14,Category15,Category16,Category17,Category18" icons
        Then I slide the "Categorywholeslide" towards "down"
        And I tap android native back and "dialerPad" for mimicking the same action on iOS

    Scenario: Adding expenses to the new account
        Given I should see "MyMoney_AccountButton" button
        # And I tap "MyMoney_CalcTextfield" field
        Then I tap "Num1" icon
        And I tap "Num0" icon
        Then I tap "Num0" icon
        # Then I enter "100" in "MyMoney_CalcTextfield" field
        And I tap "MyMoney_CatergoryButton" button
        Then I tap "Category4" icon
        Then I should see "MyMoney_AccountButton" button
        And I tap "MyMoney_SaveButton" button











