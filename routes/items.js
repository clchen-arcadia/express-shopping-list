"use strict";

const express = require("express");
const { BadRequestError } = require("../expressError");
const { itemsDb } = require("../fakeDb");
const router = new express.Router();

/** Return JSON list of shopping items */

router.get("/", function (req, res) {
  return res.json({items: itemsDb});
});

/** Accept JSON body, add item, and return it: */

router.post("/", function (req, res) {
  if(!req.body.name || !req.body.price) throw new BadRequestError();

  const itemPrice = parseFloat(req.body.price);
  if(Number.isNaN(itemPrice)) throw new BadRequestError();

  const itemName = req.body.name;

  const itemObj = {name: itemName, price: itemPrice};

  itemsDb.push(itemObj);

  return res.json({added: itemObj});
});

router.get("/:name");

router.patch("/:name");

router.delete("/:name");

module.exports = router;
