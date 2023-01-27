const fs = require("fs");




if (process.argv[2] == "CREATE") {


  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  // console.log(data.User_Details)
  let users = data.User_Details;

  for(let i=0;i<users.length;i++)
  {
    if(users[i]["AccountNumber"]==process.argv[3])
    {
        return console.log("UserAccount already Exist!")
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
}
