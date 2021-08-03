

beforeAll

describe('calculateTaxes tests', function()
{it('should calculate the high tax bracket', function () {
    expect(calculateTaxes(50000)).toBe(12500);
    expect(calculateTaxes(100000)).toBe(25000);

}) 
it('should calculate the low tax bracket', function () {
    expect(calculateTaxes(10000)).toEqual(1500)
}) 
it('should reject invalid income', function () {
    expect(() => calculateTaxes('asdfsa')).toThrowError()
    expect(() => calculateTaxes([])).toThrowError()
    expect(() => calculateTaxes(true)).toThrowError()
}) 

})
describe('Remove Dupes Tests', function(){
it('should remove dupes from array', function() {
    expect(removeDupes([1, 1, 2, 2, 3, 3, 4, 4])).toEqual([1,2,3,4])
})
it('should remove dupes from string', function() {
    expect(removeDupes('hello')).toEqual('helo')
    expect(removeDupes('hello')).toBeInstanceOf(String)
})
it('should remove value from array', function(){
    expect(remove([1,2,3,4,5,6], 6)).not.toContain(6)
}
)
})

describe('SubmitForm Tests', function(){
    it('saves input val to names arrauyu', () => 
    {
        nameInput.value = "chickenGal";
        submitForm(); 
        expect(names.length).toBe(1)
        expect(names).toContain("chickenGal")
    })
})
afterEach(function() {
   nameInput.value = "";
   names = [];
})
beforeEach(() => {
    console.log("before!");
})

beforeAll(()=> console.log("beforeAll"))
afterAll(()=> console.log("afterAll"))