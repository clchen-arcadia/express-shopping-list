"use strict";

const express = require("express");
const app = express();
const itemsRoutes = require("./routes/items");

const { NotFoundError } = require("./expressError");

app.use(express.json());

app.use("/items", itemsRoutes);

// ROUTES

app.use(function (req, res) {
  throw new NotFoundError();
});

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
