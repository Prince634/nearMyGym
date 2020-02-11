import React from 'react'

export default (props)=>{

	function scroll(type) {
        let dataType = props.dataType
        let dataList = `${props.dataType}_list`
        var elmnt = document.getElementById(dataType)
        let outerDivWidth = elmnt.offsetWidth
        let childDivWidth = document.getElementsByClassName(dataList)[0].offsetWidth
        let cardCount = document.getElementsByClassName(dataList)[0].childElementCount
        let cardWidth = Math.ceil(childDivWidth / cardCount)

        let leftScroll = document.getElementById(dataType).scrollLeft
        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
        let cardEnd = cardCount * cardWidth

        if (type == 'right') {
            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
                document.getElementById(`${dataType}_leftArrow`).classList.add("d-none")
            }
            document.getElementById(`${dataType}_RightArrow`).classList.remove("d-none")
        } else {
            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
            if (leftScroll - scrollVal <= 0) {
                document.getElementById(`${dataType}_RightArrow`).classList.add("d-none")
            }
            document.getElementById(`${dataType}_leftArrow`).classList.remove("d-none")
        }
    }

    function navigateTo(){
    	props.history.push('/pdp');
    }

    const { dataType } = props;
	return (
		<div className="crsl">
			<h1 className="crsl-hdng">Top Gym</h1>
			<div className="crsl-view" id={dataType}>
				<div className={`crsl-list ${dataType}_list`}>
					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={navigateTo}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={navigateTo}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={navigateTo}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={navigateTo}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={navigateTo}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>
				</div>
				<div className="prevBtn d-none" id={`${dataType}_RightArrow`} onClick={()=>scroll('left')}>
					<img src="https://cdn.docprime.com/cp/assets/img/customer-icons/dropdown-arrow.svg" />
				</div>
				<div className="nxtBtn" id={`${dataType}_leftArrow`} onClick={()=>scroll('right')}>
					<img src="https://cdn.docprime.com/cp/assets/img/customer-icons/dropdown-arrow.svg" />
				</div>
				
			</div>
		</div>
		)
}