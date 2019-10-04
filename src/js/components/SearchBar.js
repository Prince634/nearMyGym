import React, { useState } from 'react';
import FilteredSearch from './getFilteredSearchList.js'

export default (props)=>{

	const [searchString, setSearchString] =  useState(''); 
	const [search_list, setSearchList] =  useState([])
	const [filtered_list, getFilterList] = useState([])
	
	function handleInput(e){
		setSearchString(e.target.value);
		let getFilteredData = FilteredSearch(e.target.value, filtered_list);
		setSearchList(getFilteredData);
	}

	function getSearchList(){
		props.getAllCities((resp)=>{
			getFilterList(resp);
		})
	}

	return(
		<div className="prtlBody">
			<div className="srch-bar">
				<input type="text" className="srch-text-bar" onChange={(e)=>handleInput(e)} onFocus={()=>getSearchList()} value={searchString} onBlur={(e)=>handleBlur()}/>
			</div>
			{
				search_list && search_list.length>0 && <div className="srch-list">
				{
					search_list.map((data, key)=>{
						return <div className="srch-card" key={key}>{data.name}</div>
					})
				}
				</div>
			}
		</div>
		)
}