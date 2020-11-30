import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/env";
import mockdata from "./mockdata";
import app from "../index";
import Query from "../models/queryModel";

const token = jwt.sign(mockdata.loginUser, JWT_KEY);

chai.use(chaiHttp);
chai.should();
const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;

describe("Query related tests:", () => {
  beforeEach(async () => {
    await Query.deleteMany({});
  });
  afterEach(async () => {
    await Query.deleteMany({});
  });

  it("Should a client to create a query", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/queries")
      .send(mockdata.query);

    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
  });
  it("Should allow the admin to view all queries sent", async () => {
    await chai.request(app).post("/api/v1/queries").send(mockdata.query);
    const res = await chai
      .request(app)
      .get("/api/v1/queries")
      .set("token", token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
  });

  it("Should not allow a user with no token to view queries ", async () => {
    await chai.request(app).post("/api/v1/queries").send(mockdata.query);
    const res = await chai.request(app).get("/api/v1/queries").set("token", "");
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error");
  });

  it("Should not allow a user with invalid token to view queries ", async () => {
    await chai.request(app).post("/api/v1/queries").send(mockdata.query);
    const res = await chai
      .request(app)
      .get("/api/v1/queries")
      .set("token", "dsdhbchbchdsbvbcvbdsh");
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error");
  });
});
