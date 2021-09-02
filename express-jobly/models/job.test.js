"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Create new job", () => {
  const newJob = {
    company_handle: "c2",
    title: "Test Job",
    salary: 10000,
    equity: "0",
  };
  test("Creates new job", async () => {
    let job = await Job.create(newJob);
    expect(job).toEqual({
      company_handle: "c2",
      equity: "0",
      id: expect.any(Number),
      salary: 10000,
      title: "Test Job",
    });
  });
});

describe("GET all jobs", () => {
  test("Retrieves all jobs: no filter", async () => {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        companyName: "C1",
        company_handle: "c1",
        equity: "0.1",
        id: expect.any(Number),
        salary: 1,
        title: "J1",
      },
      {
        companyName: "C1",
        company_handle: "c1",
        equity: "0.2",
        id: expect.any(Number),
        salary: 2,
        title: "J2",
      },
      {
        companyName: "C1",
        company_handle: "c1",
        equity: null,
        id: expect.any(Number),
        salary: 3,
        title: "J3",
      },
    ]);
  });
  test("Retrieves jobs based off of min salary", async () => {
    let jobs = await Job.findAll({ minSalary: 1 });
    expect(jobs).toEqual([
      {
        companyName: "C1",
        company_handle: "c1",
        equity: "0.1",
        id: expect.any(Number),
        salary: 1,
        title: "J1",
      },
      {
        companyName: "C1",
        company_handle: "c1",
        equity: "0.2",
        id: expect.any(Number),
        salary: 2,
        title: "J2",
      },
      {
        companyName: "C1",
        company_handle: "c1",
        equity: null,
        id: expect.any(Number),
        salary: 3,
        title: "J3",
      },
    ]);
  });
  test("Retrieves job based if equity = true", async () => {
    let jobs = await Job.findAll({ hasEquity: true });
    expect(jobs).toEqual([
      {
        companyName: "C1",
        company_handle: "c1",
        equity: "0.1",
        id: expect.any(Number),
        salary: 1,
        title: "J1",
      },
      {
        companyName: "C1",
        company_handle: "c1",
        equity: "0.2",
        id: expect.any(Number),
        salary: 2,
        title: "J2",
      },
    ]);
  });
  test("Retrieves job by title", async () => {
    let jobs = await Job.findAll({ title: "J1" });
    expect(jobs).toEqual([
      {
        companyName: "C1",
        company_handle: "c1",
        equity: "0.1",
        id: expect.any(Number),
        salary: 1,
        title: "J1",
      },
    ]);
  });
});

describe("GET job based off of id", () => {
  const newJob = {
    company_handle: "c1",
    title: "Test",
    salary: 10000,
    equity: 0,
  };

  test("Retreives correct job from id", async () => {
    const newJobRes = await Job.create(newJob);
    const id = newJobRes.id;
    let job = await Job.get(id);
    expect(job).toEqual({
      company: undefined,
      company_handle: "c1",
      equity: "0",
      id: expect.any(Number),
      salary: 10000,
      title: "Test",
    });
  });
  test("Throws error if job not found", async () => {
    try {
      let job = await Job.get(0);
    } catch (e) {
      expect(e instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("Delete Job", () => {
  const newJob = {
    company_handle: "c1",
    title: "Test",
    salary: 10000,
    equity: 0,
  };
  test("Deletes job given specified id", async () => {
    const newJobRes = await Job.create(newJob);
    const id = newJobRes.id;
    await Job.delete(id)
    const res = await db.query(`SELECT id FROM jobs WHERE id=${id}`)
    expect(res.rows.length).toEqual(0)
  });
});
