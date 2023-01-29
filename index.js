/*
Instructions For executing this application

1.To Create 
      Syntax: node index.js CREATE AccountNumber Name
      EdgeCases: 
           1. we should enter your name as well as account number while creation of your account
           2. Account Number Should be unique
 
2. Deposit
         
      Syntax: node index.js DEPOSIT AccountNumber Amount
      EdgeCases:
            1. we should enter your amount as well as account number while creation of your account
            2. You Can't deposit less than or equal to 0

3. Withdraw
 
        Syntax: node index.js WITHDRAW AccountNumber Amount
        Edgecases:
           1. we should enter your amount as well as account number while creation of your account
           2. you can't withdraw less than or equal to 0
           3. you cant't withdraw more than your account balance

4.Balance

       Syntax: node index.js BALANCE AccountNumber
*/












const fs = require("fs");

/* TO CREATE ACCOUNT ----START----*/

if (process.argv[2] == "CREATE") {
    if(process.argv[3]==undefined)
    {
        return console.log("You Should Enter Your Account Number!")
    }
    if(process.argv[4]==undefined)
    {
        return console.log("You Should Enter Name!")
    }
   
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let users = data.User_Details;
  for (let i = 0; i < users.length; i++) {
    if (users[i]["AccountNumber"] == process.argv[3]) {
      return console.log("UserAccount already Exist!");
    }
  }
  let payload = {
    AccountNumber: process.argv[3],
    Balance: 0,
    Name: process.argv[4],
  };

  let newData = [...users, payload];
  data.User_Details = newData;
  let finalData = JSON.stringify(data);
  fs.writeFileSync("./db.json", finalData, "utf-8");
  console.log(`your Account has been created with Account Number : ${process.argv[3]} And Name: ${process.argv[4]}`)
} 
/* TO CREATE ACCOUNT ----END----*/

/* TO DEPOSIT BALANCE IN ACCOUNT ----START----*/
else if (process.argv[2] == "DEPOSIT") {
    if(process.argv[3]==undefined)
    {
        return console.log("You Should Enter Your Account Number!")
    }
    if(process.argv[4]==undefined)
    {
        return console.log("You Should Enter Amount!")
    }

  if (process.argv[4] <= 0) {
    return console.log("Not A valid Amount For Depositing!");
  }

  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

  let users = data.User_Details;

  let newData = users.map((el) => {
    if (el["AccountNumber"] == process.argv[3]) {
      return { ...el, Balance: el.Balance + Number(process.argv[4]) };
    } else {
      return el;
    }
  });

  data.User_Details = newData;
  const final = JSON.stringify(data);
  fs.writeFileSync("./db.json", final, "utf-8");
  console.log(`your Amount ${process.argv[4]} is Deposited in Account ${process.argv[3]}`)
} 

/* TO DEPOSIT BALANCE IN ACCOUNT ----END----*/


/* TO WITHDRAW BALANCE FROM ACCOUNT ----START----*/
else if (process.argv[2] == "WITHDRAW") {

    if(process.argv[3]==undefined)
    {
        return console.log("You Should Enter Your Account Number!")
    }
    if(process.argv[4]==undefined)
    {
        return console.log("You Should Enter Amount!")
    }

  if (process.argv[4] <= 0) {
    return console.log("The Balance for withdrawal is Incorrect!");
  }

  

  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let users = data.User_Details;
for(let i=0;i<users.length;i++)
{
    if(process.argv[3]==users[i]["AccountNumber"])
    {
         if(users[i]["Balance"]<Number(process.argv[4]))
         {
            return console.log("Insufficient Balance!")
         }
    }
}
  let newData = users.map((el) => {
    if (
      el["AccountNumber"] == process.argv[3] &&
      process.argv[4] <= el["Balance"]
    ) {
      return { ...el, Balance: el.Balance - Number(process.argv[4]) };
    } else {
      return el;
    }
  });

  data.User_Details = newData;
  const final = JSON.stringify(data);
  fs.writeFileSync("./db.json", final, "utf-8");
  console.log(`${process.argv[4]} withdrawn from Account : ${process.argv[3]}`)
} 
/* TO WITHDRAW BALANCE FROM ACCOUNT ----END----*/


/* TO CHECK BALANCE IN OUR ACCOUNT ----START----*/
else if (process.argv[2] == "BALANCE") {

  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let users = data.User_Details;
for(let i=0;i<users.length;i++)
{
    if (users[i]["AccountNumber"] == process.argv[3]) {
        return console.log(users[i]["Name"],users[i]["Balance"]);
      } 
}
console.log("Account Does not Exist!")
  

  
}

/* TO CHECK BALANCE IN OUR ACCOUNT ----END----*/
