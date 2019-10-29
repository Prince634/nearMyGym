import React from 'react'

export default (props)=>{

	return (
		<div className="crsl">
			<h1 className="crsl-hdng">Top Gym</h1>
			<div className="crsl-view">
				<div className="crsl-list">
					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={()=>{}}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={()=>{}}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={()=>{}}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={()=>{}}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>

					<div className="crsl-tab crsr">
						<div className="crsl-img-cnt">
							<img className="crsl-img" src={ASSETS_BASE_URL+"/cureFit.jpg"} onClick={()=>{}}/>
						</div>
						<p>Cult Fit, Sector 44 Gurgaon</p>
					</div>
				</div>
				{/*<div className="nxtBtn">
					<img src="https://cdn.docprime.com/cp/assets/img/customer-icons/dropdown-arrow.svg" />
				</div>	*/}
			</div>
		</div>
		)
}