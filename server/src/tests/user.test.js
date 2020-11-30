import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import mockdata from "./mockdata";
import jwt from "jsonwebtoken";
import app from "../index";
import User from "../models/userModel";
import { JWT_KEY } from "../config/env";
import fs from "fs";

chai.use(chaiHttp);
chai.should();
const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;
const token = jwt.sign(mockdata.loginUser, JWT_KEY);

describe("User related tests:", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  it("Should create a user", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/users/register")
      .send(mockdata.signUpUser);

    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
  });

  it("should not create a user with some missing data", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/users/register")
      .send(mockdata.signUpInvalid);

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error");
  });

  it("Should login a user", async () => {
    await chai
      .request(app)
      .post("/api/v1/users/register")
      .send(mockdata.signUpUser);

    const res = await chai
      .request(app)
      .post("/api/v1/users/login")
      .send(mockdata.loginUser);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("data");
  });
  it("Should not login a user with invalid", async () => {
    await chai
      .request(app)
      .post("/api/v1/users/register")
      .send(mockdata.signUpUser);

    const res = await chai
      .request(app)
      .post("/api/v1/users/login")
      .send(mockdata.loginInvalidUser);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error");
  });

  it("should update the user's profile picture", async () => {
    const userRes = await chai
      .request(app)
      .post("/api/v1/users/register")
      .send(mockdata.signUpUser);

    const resLogin = await chai
      .request(app)
      .post("/api/v1/users/login")
      .send(mockdata.loginUser);
    const res = await chai
      .request(app)
      .patch(`/api/v1/users/updateProfile/${userRes.body.data._id}`)
      .set("token", resLogin.body.data)
      .attach(
        "profileImage",
        fs.readFileSync("src/tests/img/imageTest.jpg"),
        "imageTest.jpg"
      );
    expect(res.status).to.be.equal(200);
  });
});
