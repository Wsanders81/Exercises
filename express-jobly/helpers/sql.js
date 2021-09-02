const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // * collect keys (names) of data to update to loop over and 
  // * create new SQL query 
  const keys = Object.keys(dataToUpdate);
  
  // if !dataToUpdate throw ExpressError 
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
  // * if first_name is not being altered, then use jsToSql
  // * ensure JS names are converted to match SQL DB names OR 
  // * if column name is already present, use that. Include
  // * index to complete query. ie, first_name = $1
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    // * return completed SQL update query followed by array 
    // * of values in order 

    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
