import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { stub } from "sinon";
import uploader from "../config/cloudinary";

chai.use(chaiHttp);
const { it, describe } = mocha;
const { expect } = chai;

const image = "https://pixabay.com/vectors/avatar-icon-placeholder-1577909/";
stub(uploader, "upload").resolves({ url: image });

describe("App test:", () => {
  it("should display a Not found message", async () => {
    const res = await chai.request(app).get("/james");
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
  });

  it("should display a swaggerUi", async () => {
    const res = await chai.request(app).get("/api-docs");
    expect(res.status).to.be.equal(200);
  });
});
