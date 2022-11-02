"use strict";

const express = require("express");
const router = new express.Router();

const { BadRequestError, NotFoundError } = require("../expressError");

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

router.get("/:name", function (req, res) {
  const itemName = req.params.name;

  for(let item of itemsDb.items) {
    if(item.name === itemName) {
      return res.json(item);
    }
  }

  throw new NotFoundError();
});

router.patch("/:name", function (req, res) {
  if(!req.body.name || !req.body.price) throw new BadRequestError();

  const itemName = req.params.name;

  for(let i = 0; i < itemsDb.items.length; i++) {
    if(itemsDb.items[i].name === itemName) {
      itemsDb.items[i].name = data.name;
      itemsDb.items[i].price = data.price;
      return res.json({updated: itemsDb.items[i]});
    }
  }

  throw new NotFoundError();
});

// router.delete("/:name");

module.exports = router;
