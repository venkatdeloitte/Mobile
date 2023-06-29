const ios = {
  // Welcome Page
}

const android = {
  // Welcome Page
  MyMoney_Welcomelogo: '//android.widget.TextView[@text="Welcome"]',
  MyMoney_NextButton: '//android.view.ViewGroup/android.widget.Button',
  MyMoney_Disclaimertext: '//android.widget.LinearLayout/android.widget.TextView[3]',
  MyMoney_Remindeicon: '//android.widget.ImageView[@content-desc="Reminder from MyMoney"]',
  MyMoney_Expensereminder: '//android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView[1]',
  MyMoney_NextButton2: '//android.view.ViewGroup/android.widget.Button[2]',
  MyMoney_Logoimage: '//android.widget.RelativeLayout/android.widget.TextView',
  MyMoney_LogoDescription: '//android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView[2]',
  MyMoney_SendUsage_Description: '//android.widget.ScrollView/android.widget.LinearLayout/android.widget.Switch',
  MyMoney_Crashradiobutton: '//android.widget.ScrollView/android.widget.LinearLayout/android.widget.Switch',
  MyMoney_Radiobuttondescription: '//android.widget.LinearLayout/android.widget.TextView[3]',
  MyMoney_Termsofuseandprivacy: '//android.widget.FrameLayout/android.view.ViewGroup/android.widget.TextView',
  MyMoney_StartButton: '//android.view.ViewGroup/android.widget.Button[2]',
  MyMoney_BackButton: '//android.view.ViewGroup/android.widget.Button[1]',
  MyMoney_Dashboardlogo: '//android.widget.LinearLayout/android.view.ViewGroup[1]/android.widget.TextView',
  dialerPad: '//*[@resource-id="com.samsung.android.dialer:id/dialpad_keypad_only"]',

  // Homepage
  MyMoney_Recordicon: '//android.widget.FrameLayout[@content-desc="Categories"]/android.widget.FrameLayout/android.widget.ImageView',
  MyMoney_Analysisicon: '//android.widget.FrameLayout[@content-desc="Analysis"]/android.widget.FrameLayout/android.widget.ImageView',
  MyMoney_Budgeticon: '//android.widget.FrameLayout[@content-desc="Budgets"]/android.widget.FrameLayout/android.widget.ImageView',
  MyMoney_Accountsicon: '//android.widget.FrameLayout[@content-desc="Budgets"]/android.widget.FrameLayout/android.widget.ImageView',
  MyMoney_Categoriesicon: '//android.widget.FrameLayout[@content-desc="Categories"]/android.widget.FrameLayout/android.widget.ImageView',
  MyMoney_Filtericon: '//android.widget.ImageButton[@content-desc="Display options"]',
  MyMoney_Emptyicon: '//android.widget.ImageView[@content-desc="No"]',
  MyMoney_Norecorddescription: '//android.widget.LinearLayout/android.widget.TextView',
  MyMoney_CurrentDate: '//android.widget.TextView[@resource-id="com.raha.app.mymoney.free:id/id_ds_date_text"]',
  MyMoney_NextMonthicon: '//android.widget.ImageButton[@content-desc="Next month"]',
  MyMoney_Previousmonthicon: '//android.widget.ImageButton[@content-desc="Previous month"]',
  MyMoney_Expenseheader: '//android.widget.TextView[@text="EXPENSE"]',
  MyMoney_Incomeheader: '//android.widget.TextView[@text="INCOME"]',
  MyMoney_Totalheader: '//android.widget.TextView[@text="TOTAL"]',
  MyMoney_Dashboard: '//android.widget.ScrollView/android.widget.LinearLayout/android.view.ViewGroup[1]/android.widget.ImageButton',
  MyMoney_Appname: '//android.widget.TextView[@resource-id="com.raha.app.mymoney.free:id/tv_app_name"]',
  MyMoney_Preferencesicon: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[1]',
  MyMoney_Exportsrecords: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[2]',
  MyMoney_Backupandrestore: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[3]',
  MyMoney_Deleteandreset: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[4]',
  MyMoney_Proversion: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[5]',
  MyMoney_Likemymoney: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[6]',
  MyMoney_Help: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[7]',
  MyMoney_Feedback: '//android.widget.FrameLayout/androidx.recyclerview.widget.RecyclerView/androidx.appcompat.widget.LinearLayoutCompat[8]',
  MyMoney_Searchbox: '//android.widget.Button[@content-desc="Search"]',
  MyMoney_Addanewrecordicon: '//android.widget.ImageButton[@content-desc="Add new record"]',
  // Expense addition screen
  MyMoney_CancelButton: '//android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button[1]',
  MyMoney_SaveButton: '//android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button[2]',
  MyMoney_AccountButton: '//android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button[3]',
  MyMoney_CatergoryButton: '//android.widget.FrameLayout/android.view.ViewGroup/android.widget.Button[4]',
  MyMoney_Edittextfield: '//android.widget.FrameLayout/android.view.ViewGroup/android.widget.EditText',
  MyMoney_ExpenseCalculator: '//android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup',
  MyMoney_SelectAccountheader: '//android.view.ViewGroup[1]/android.widget.TextView[1]',
  MyMoney_Cardheader: '//android.view.ViewGroup[2]/android.widget.TextView[1]',
  MyMoney_Savingsheader: '//android.view.ViewGroup[3]/android.widget.TextView[1]',
  MyMoney_Addanewaccountbtn: '//android.widget.Button[@resource-id="com.raha.app.mymoney.free:id/btn_add"]',
  My_Money_Newbtnadded: '//android.widget.Button[@text=test]',

  // Account addition 
  MyMoney_Addaccount: '//android.view.ViewGroup/android.widget.TextView[1]',
  MyMoney_initialamount: '//android.view.ViewGroup/android.widget.TextView[2]',
  MyMoney_initialamountdisclaimer: '//android.view.ViewGroup/android.widget.TextView[3]',
  MyMoney_Nametitle: '//android.view.ViewGroup/android.widget.TextView[4]',
  MyMoney_icontitle: '//android.view.ViewGroup/android.widget.TextView[5]',
  MyMoney_icons: '//android.view.ViewGroup/android.widget.GridView',
  MyMoney_icon1: '(//android.widget.ImageView[@content-desc="Icon"])[1]',
  NewAccount_Amountfield: '//android.view.ViewGroup/android.widget.EditText[1]',
  NewAccount_Namefield: '//android.view.ViewGroup/android.widget.EditText[2]',
  NewAccount_CancelBtn: '//android.view.ViewGroup/android.widget.Button[1]',
  NewAccount_SaveBtn: '//android.view.ViewGroup/android.widget.Button[2]',
  NewAccount_nameaddded1: '//androidx.recyclerview.widget.RecyclerView/android.view.ViewGroup[4]',
  NewAccount_amtadded1: '//android.view.ViewGroup[5]/android.widget.TextView[2]',

  //adding expenses
  MyMoney_CalcTextfield: '//android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView',

  //Categories
  Category_header: '//android.widget.FrameLayout/android.widget.LinearLayout/android.widget.TextView',
  Categorywholeslide: '//android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout',
  Category1: '//android.widget.GridView/android.widget.LinearLayout[1]',
  Category2: '//android.widget.GridView/android.widget.LinearLayout[2]',
  Category3: '//android.widget.GridView/android.widget.LinearLayout[3]',
  Category4: '//android.widget.GridView/android.widget.LinearLayout[4]',
  Category5: '//android.widget.GridView/android.widget.LinearLayout[5]',
  Category6: '//android.widget.GridView/android.widget.LinearLayout[6]',
  Category7: '//android.widget.GridView/android.widget.LinearLayout[7]',
  Category8: '//android.widget.GridView/android.widget.LinearLayout[8]',
  Category9: '//android.widget.GridView/android.widget.LinearLayout[9]',
  Category10: '//android.widget.GridView/android.widget.LinearLayout[10]',
  Category11: '//android.widget.GridView/android.widget.LinearLayout[11]',
  Category12: '//android.widget.GridView/android.widget.LinearLayout[12]',
  Category13: '//android.widget.GridView/android.widget.LinearLayout[13]',
  Category14: '//android.widget.GridView/android.widget.LinearLayout[14]',
  Category15: '//android.widget.GridView/android.widget.LinearLayout[15]',
  Category16: '//android.widget.GridView/android.widget.LinearLayout[16]',
  Category17: '//android.widget.GridView/android.widget.LinearLayout[17]',
  Category18: '//android.widget.GridView/android.widget.LinearLayout[18]',

//Numbers:
Num1: '//android.widget.Button[@text="1"]',
Num2: '//android.widget.Button[@text="2"]',
Num3: '//android.widget.Button[@text="3"]',
Num4: '//android.widget.Button[@text="4"]',
Num5: '//android.widget.Button[@text="5"]',
Num6: '//android.widget.Button[@text="6"]',
Num7: '//android.widget.Button[@text="7"]',
Num8: '//android.widget.Button[@text="8"]',
Num9: '//android.widget.Button[@text="9"]',
Num0: '//android.widget.Button[@text="0"]',











}

module.exports = { ios, android }
