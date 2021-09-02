const { sqlForPartialUpdate } = require('./sql')

describe("testing sqlForPartialUpdate helper function", ()=> {
    test ("Correctly updates item ", ()=> {
        const res = sqlForPartialUpdate(
            {firstName: "Bob", age: 21},
            {firstName: "first_name"} 
            
        )
        expect(res).toEqual(
            {"setCols": "\"first_name\"=$1, \"age\"=$2", "values": ["Bob", 21]}
        )
    })
})