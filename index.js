const fs = require("fs");

/* TO CREATE ACCOUNT ----START----*/

if (process.argv[2] == "CREATE") {
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
} else if (process.argv[2] == "DEPOSIT") {
  /* TO CREATE ACCOUNT ----END----*/

  /* TO DEPOSIT BALANCE IN ACCOUNT ----START----*/
  if (process.argv[4] < 0) {
    return console.log("Not A valid Amount To be Deposited!");
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
} else if (process.argv[2] == "WITHDRAW") {
  /* TO DEPOSIT BALANCE IN ACCOUNT ----END----*/

  /* TO WITHDRAW BALANCE FROM ACCOUNT ----START----*/
  if (process.argv[4] < 0) {
    return console.log("The Balance for withdrawal is Incorrect!");
  }

  if (process.argv[4] == 0) {
    return console.log("Insufficient Balance !");
  }

  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let users = data.User_Details;

  let newData = users.map((el) => {
    if (
      el["AccountNumber"] == process.argv[3] &&
      process.argv[4] <= el.Balance
    ) {
      return { ...el, Balance: el.Balance - Number(process.argv[4]) };
    } else {
      return el;
    }
  });

  data.User_Details = newData;
  const final = JSON.stringify(data);
  fs.writeFileSync("./db.json", final, "utf-8");
} else if (process.argv[2] == "BALANCE") {
  /* TO WITHDRAW BALANCE FROM ACCOUNT ----END----*/

  /* TO CHECK BALANCE IN OUR ACCOUNT ----START----*/
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let users = data.User_Details;
  let newData = users.map((el) => {
    if (el.AccountNumber == process.argv[3]) {
      return console.log(el.Name, el.Balance);
    } else {
      return el;
    }
  });

  const final = JSON.stringify(data);
  fs.writeFileSync("./db.json", final, "utf-8");
}

/* TO CHECK BALANCE IN OUR ACCOUNT ----END----*/
