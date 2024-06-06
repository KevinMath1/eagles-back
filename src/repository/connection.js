import mysql from "mysql2/promise";
const con = await mysql.createConnection({
  host: "20.206.240.6",
  user: "admin",
  password: "@dm!n",
  database: "Eagles",
  port: 3306,
});
console.log("Conexão com BD realizada");
export default con;
