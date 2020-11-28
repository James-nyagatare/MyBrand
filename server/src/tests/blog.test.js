import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/env";
import mockdata from "./mockdata";
import app from "../index";
import Blog from "../models/blogModel";
import fs from "fs";

const token = jwt.sign(mockdata.loginUser, JWT_KEY);

chai.use(chaiHttp);
chai.should();
const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;

describe("Post related tests:", async () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  });

  afterEach(async () => {
    await Blog.deleteMany({});
  });

  it("Should create a blog", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/blogs")
      .set("token", token)
      .field({
        title: mockdata.blogPost.title,
        content: mockdata.blogPost.content,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/img/imageTest.jpg"),
        "imageTest.jpg"
      );
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property("message");
    expect(res.body).to.have.property("data");
  });

  it("Should not create a blog when user did not provide a token", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/blogs")
      .set("token", "")
      .field({
        title: mockdata.blogPost.title,
        content: mockdata.blogPost.content,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/img/imageTest.jpg"),
        "imageTest.jpg"
      );
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error");
  });

  it("Should display a list of blogs", async () => {
    await chai
      .request(app)
      .post("/api/v1/blogs")
      .set("token", token)
      .field({
        title: mockdata.blogPost.title,
        content: mockdata.blogPost.content,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/img/imageTest.jpg"),
        "imageTest.jpg"
      );
    const res = await chai.request(app).get("/api/v1/blogs");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should update a blog post", async () => {
    const blogRes = await chai
      .request(app)
      .post("/api/v1/blogs")
      .set("token", token)
      .field({
        title: mockdata.blogPost.title,
        content: mockdata.blogPost.content,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/img/imageTest.jpg"),
        "imageTest.jpg"
      );

    const res = await chai
      .request(app)
      .put(`/api/v1/blogs/${blogRes.body.data._id}`)
      .set("token", token)
      .send(mockdata.blogPost);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });

  it("should add a comment on a blog", async () => {
    const blogRes = await chai
      .request(app)
      .post("/api/v1/blogs")
      .set("token", token)
      .field({
        title: mockdata.blogPost.title,
        content: mockdata.blogPost.content,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/img/imageTest.jpg"),
        "imageTest.jpg"
      );
    const res = await chai
      .request(app)
      .post(`/api/v1/comments/${blogRes.body.data._id}`)
      .send(mockdata.postComment);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property("message");
  });

  it("should add a like on a blog", async () => {
    const blogRes = await chai
      .request(app)
      .post("/api/v1/blogs")
      .set("token", token)
      .field({
        title: mockdata.blogPost.title,
        content: mockdata.blogPost.content,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/img/imageTest.jpg"),
        "imageTest.jpg"
      );

    const res = await chai
      .request(app)
      .patch(`/api/v1/blogs/${blogRes.body.data._id}/like`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message");
  });
});
