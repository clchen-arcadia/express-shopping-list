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
  it("gets the list of items", async function() {
    const resp = await request(app).get('/items');
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({items: [TEST_ITEM]});
  })
});

describe("test POST /items", function() {
  it("creates a new item", async function() {
    const resp = await request(app)
      .post('/items')
      .send({
        name: 'soda',
        price: 1
      });
    expect(resp.statusCode).toEqual(200);
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

describe("test GET /items/:name", function() {
  it("gets single item", async function() {
    const resp = await request(app).get(`/items/${TEST_ITEM.name}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(TEST_ITEM);
  });

  it("rejects nonexistent item", async function() {
    const resp = await request(app).get("/items/nonexistent");
    expect(resp.statusCode).toEqual(404);
  });
});

// describe("test PATCH /items/:name", function() {
//   it("updates single item", async function() {
//     const resp = await request(app)
//       .patch(`/items/${TEST_ITEM.name}`)
//       .send()
//   })
// })

describe("test DELETE /items/:name", function() {
  it("rejects nonexistent item", async function() {
    const resp = await request(app).delete("/items/nonexistent");
    expect(resp.statusCode).toEqual(404);
    expect(db.items.length).toEqual(1);
  });

  it("deletes a single item", async function() {
    const resp = await request(app).delete(`/items/${TEST_ITEM.name}`);
    expect(resp.statusCode).toEqual(200);
    expect(db.items.length).toEqual(0);
    expect(resp.body).toEqual({ message: "Deleted"});
  });
});
