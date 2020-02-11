import { sum, asyncCatchFunc, asyncFunc } from './sum.js'

test('test add 1 + 2 to 3', ()=>{
	expect(sum(1,2)).toBe(3);
})

test('Success Async func', ()=>{
	return expect(asyncFunc()).resolves.toBe(5);
})

test('Success Fail NEw new func', ()=>{
	return expect(asyncCatchFunc()).resolves.toBe(5);
})
