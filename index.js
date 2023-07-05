const express = require("express")();
require("dotenv").config();
const p = process.env;

express.get("/api/data", (req, res) => {
  res.send("hey");
});

express.listen(p.PORT, () => {
  console.log(`Express Server Running On Port ${p.PORT}`);
});
