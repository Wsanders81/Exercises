"use strict"

const db = require('../db')
const { NotFoundError } = require('../expressError')
const { sqlForPartialUpdate } = require("../helpers/sql");


// * Related functions for Jobs

class Job {
// * Create job, update db, return new job
// * data should be { title, salary, equity, company_handle}
// * returns { title, salary, equity, company_handle}

  static async create({ title, salary, equity, company_handle}){
      
    const res = await db.query(
        `INSERT INTO jobs
        ( title, salary, equity, company_handle)
        VALUES ($1, $2, $3, $4)
        RETURNING id,title, salary, equity, company_handle`, 
        [
            title,  
            salary, 
            equity, 
            company_handle
        ]
    )
    const job = res.rows[0]
    return job; 
  }

// * Find all jobs
// * Returns ([{ title, salary, equity, company_handle}])

  static async findAll(params = {}){
    const {title, minSalary, hasEquity} = params
    let query = 
      `SELECT j.id,
              j.title, 
              j.salary, 
              j.equity, 
              j.company_handle, 
              c.name AS "companyName"
       FROM jobs AS j
          LEFT JOIN companies AS c
          ON c.handle = j.company_handle`
    let whereVals = []
    let vals = []
    if(title !== undefined) {
      vals.push(`%${title}%`)
      whereVals.push(`title ILIKE $${vals.length}`)
    }
    if(minSalary !== undefined) {
      vals.push(minSalary)
      whereVals.push(`salary >= $${vals.length}`)
    }
    if(hasEquity === true){
      whereVals.push(`equity > 0`)
    }
    if(whereVals.length > 0 ) {
      query += " WHERE " + whereVals.join(" AND ")
    }
    
    const jobsRes = await db.query(query, vals)
    
    return jobsRes.rows
  }
  
  static async get(id) {
    const res = await db.query(`
          SELECT id, 
                 title, 
                 salary, 
                 equity, 
                 company_handle
            FROM jobs
            WHERE id = $1`, 
              [id])
    const job = res.rows[0]
    if(!job) {
      throw new NotFoundError(`Job ${id} does not exist`)
    }
    const companyHandle = job.companyHandle
    const companyRes = await db.query(`
          SELECT handle, 
                 name, 
                 description, 
                 num_employees, 
                 logo_url
            FROM companies
            WHERE handle = $1`, 
              [companyHandle])
    //delete job.companyHandle
    job.company = companyRes.rows[0]
  
    return job
  }

  // * Update job with specified id
  // * Can update: { title, salary, equity }
  // * throws error if job id not found

  static async update(id, data) { 
    const { setCols, values } = sqlForPartialUpdate(data,{})
    const idVarIdx = "$" + (values.length + 1)

    const querySql = `UPDATE jobs
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id, 
                      title, 
                      salary, 
                      equity, 
                      company_handle`
    const res = await db.query(querySql, [...values, id])
    const job = res.rows[0]

    if(!job) {
      throw new NotFoundError(`Job with id ${id} does not exist`)
    }

    return job

  }
  // * Delete job from DB with specified id 
  // * throws error if job is not found
  static async delete(id) {
    const res = await db.query(`
          DELETE FROM jobs
          WHERE id = $1 
          RETURNING id     
          `, [id])
    const job = res.rows[0]

    if(!job) {
      throw new NotFoundError(`Job with id ${id} does not exist`)
    }

  }



}


module.exports = Job