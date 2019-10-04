export default (searchText, searchList)=>{
	let list_data = []
	for(let i =0;i<searchList.length;i++){

		let index = searchList[i].name.toLowerCase().indexOf(searchText.toLowerCase());
		if(index>-1) {
			list_data.push({...searchList[i], rank: index})
		}
	}
	list_data = list_data.sort((a,b)=>{
		return a.rank-b.rank
	})

	return(
		list_data
		)
}