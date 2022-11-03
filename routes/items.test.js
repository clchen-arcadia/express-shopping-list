"use strict";

const request = require("supertest");
const app = require('../app');

const db = require('../fakeDb');

const TEST_ITEM = {
  name: 'pretzel',
  price: 3.50
};

beforeEach(function() {
  db.items.push(TEST_ITEM);
});

afterEach(function() {
  db.items = [];
});

describe("test GET /items", function() {
  it("get the list of items", async function() {
    const resp = await request(app).get('/items');
    expect(resp.body).toEqual({items: [TEST_ITEM]});
  })
});

describe("test POST /items", function() {
  it("create a new item", async function() {
    const resp = await request(app)
      .post('/items')
      .send({
        name: 'soda',
        price: 1
      });
    expect(resp.body).toEqual({added: {
      name: 'soda',
      price: 1
    }});
    expect(db.items.length).toEqual(2);
  });

  it("rejects invalid input post requests", async function() {
    const resp = await request(app)
      .post('/items')
      .send({
        name: 'test',
        price: 'string'
      });
      expect(resp.statusCode).toEqual(400);
  });

  it("rejects empty body post requests", async function() {
    const resp = await request(app)
      .post('/items')
      .send({});
      expect(resp.statusCode).toEqual(400);
  });
});
