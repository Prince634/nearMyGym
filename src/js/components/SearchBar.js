import React, { useState } from 'react';
import FilteredSearch from './getFilteredSearchList.js'

export default (props)=>{

	const [searchString, setSearchString] =  useState(''); 
	const [search_list, setSearchList] =  useState([])
	const [filtered_list, getFilterList] = useState([])
	
	function handleInput(e){
		setSearchString(e.target.value);
		let getFilteredData = FilteredSearch(e.target.value, search_list);
		getFilterList(getFilteredData);
	}

	function getSearchList(){
		props.getAllCities((resp)=>{
			getFilterList(resp);
			setSearchList(resp);
		})
	}

	function handleBlur(e) {

	}

	function handleCrossClick() {
		getFilterList(search_list)
		setSearchString([])
	}
	return(
		<div className="prtlBody">
			<div className="srch-bar">
				<input type="text" className="srch-text-bar" onChange={(e)=>handleInput(e)} onFocus={()=>getSearchList()} value={searchString} onBlur={(e)=>handleBlur(e)}/>
				{
					searchString && searchString.length>0 && <img className="cross-icn" src={ASSETS_BASE_URL+"/red-cut.png"} onClick={()=>handleCrossClick()}/>
				}
				
			</div>
			{
				filtered_list && filtered_list.length>0 && <div className="srch-list">
				{
					filtered_list.map((data, key)=>{
						return <div className="srch-card" key={key}>{data.name}</div>
					})
				}
				</div>
			}
		</div>
		)
}