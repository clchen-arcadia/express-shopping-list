"use strict";

const express = require("express");
const router = new express.Router();

const { BadRequestError } = require("../expressError");

const itemsDb = require("../fakeDb");
// const itemsDbList = itemsDb.items;


/** Return JSON list of shopping items */

router.get("/", function (req, res) {

  console.log("router get invoked");
  debugger;

  return res.json({
    items: itemsDb.items
  });
});

/** Accept JSON body, add item, and return it: */

router.post("/", function (req, res) {

  console.log("router post invoked");
  debugger;

  if(!req.body.name || !req.body.price) throw new BadRequestError();

  const itemPrice = parseFloat(req.body.price);
  if(Number.isNaN(itemPrice)) throw new BadRequestError();

  const itemName = req.body.name;

  const itemObj = {name: itemName, price: itemPrice};

  itemsDb.items.push(itemObj);

  return res.json({added: itemObj});
});

// router.get("/:name");

// router.patch("/:name");

// router.delete("/:name");

module.exports = router;
