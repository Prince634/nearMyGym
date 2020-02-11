function sum(a, b){
	return a+b;
}

function asyncFunc(){
	return new Promise((resolve, reject)=>{
		resolve(5)
	})
}

function asyncCatchFunc(){
	return new Promise((resolve, reject)=>{
		resolve(5);

	}).catch((e)=>{

	})
}
module.exports = { 
	sum,
	asyncFunc,
	asyncCatchFunc
};