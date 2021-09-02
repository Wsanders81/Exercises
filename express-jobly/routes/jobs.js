
// * Routes for Jobs

const jsonschema = require('jsonschema')
const express = require('express')

const { BadRequestError, NotFoundError } = require("../expressError")
const { ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job")

// todo Add schema and require
const jobSearchSchema = require('../schemas/jobSearch.json')
const jobNewSchema = require('../schemas/jobSearch.json')

const router = new express.Router()

// * Get all companies. If query exists, filter by 
// * minSalary, hasEquity and/or title

router.get("/", async function(req, res, next)  {
    if(req.query) {
        if(req.query.minSalary !== undefined) {
            req.query.minSalary = +req.query.minSalary
        }
        if(req.query.hasEquity !== undefined) {
            req.query.hasEquity = Boolean(req.query.hasEquity)
        }
    }
    try {
        const validator = jsonschema.validate(req.query, jobSearchSchema)
        if(!validator.valid) {
            const errs = validator.errors.map(e=> e.stack)
            throw new BadRequestError(errs)
        }

        const jobs = await Job.findAll(req.query)
        return res.json({jobs})
    } catch(e) {
        return next(e)
    }
})

router.post("/",ensureAdmin, async (req, res,next) => {
    try {
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
    
        const job = await Job.create(req.body);
        return res.status(201).json({ job });
      } catch (err) {
        return next(err);
      }
})

// * Get job using id number
// * returns { id, salary, equity, company }
// * can update { title, salary, equity}

router.get("/:id", async function (req, res, next) {
    try {
      const job = await Job.get(req.params.id);

      

      return res.json({ job });
    } catch (err) {
      return next(err);
    }
  });

  // * Deletes Job
  // * throws error if job doesn't exist
  router.delete('/:id', ensureAdmin, async () => {
      try {
          await Job.delete(req.params.id)
          return res.json({deleted: req.params.id})
      } catch(e) {
          return next(e)
      }
  })





module.exports = router
