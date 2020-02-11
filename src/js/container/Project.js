import React, { Component } from 'react';

// state data for 3 counters
const data = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
  { id: 4, value: 0 },
  { id: 5, value: 0 }
];

// Counter Component
class Counter extends Component {
  render() {
    const { id, value } = this.props;
    return (
      <div className="counter">
        <b>{value}</b>
        <div className="counter-controls">
          <button className="button is-danger is-small" onClick={()=>this.props.onDecrement(id, 1)}>-</button>
          <button onClick={()=>this.props.onIncrement(id, 1)} className="button is-success is-small">+</button>
        </div>
      </div>
    );
  }
}

//New Counter Component
class NewCounter extends Component {
  render() {
    const { id, value } = this.props;
    return (
      <div className="counter">
        <b>{value}</b>
        <div className="counter-controls">
          <button className="button is-danger is-small" onChange={()=>this.props.changeVal(-1)}>-</button>
          <button onClick={()=>this.props.changeVal(1)} className="button is-success is-small">+</button>
        </div>
      </div>
    );
  }
}

class Total extends Component {
  render(){
   let total_count =  0
        {
          this.props.total_counter.map(counter => (
            total_count += counter.value
        ))
        }
    return (
        <div>
        {`Total Count = ${total_count}`}
        </div>
    )
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      localState: data
    }
  }
 
onIncrement = (id, val)=>{
  let newCounterData = this.state.localState.map((x)=>{
    if(x.id == id){
      return {id: id, value: x.value+val}
    }else{
      return x;
    }
  })

  this.setState({localState:newCounterData});
}

onDecrement = (id, val) =>{
  let newCounterData = this.state.localState.map((x)=>{
    if(x.id == id){
      return {id: id, value: x.value>0?x.value-val:x.value}
    }else{
      return x;
    }
  })
  this.setState({localState:newCounterData});
}


changeVal = (val)=> {
  let newCounterData = this.state.localState.map((x)=>{
    if(x.id == 5){
      return {id: 5, value: x.value>=0?x.value+val:x.value}
    }else{
      return x;
    }
  })
  this.setState({localState:newCounterData});
}

  render() {
    return (
      <div>
        {this.state.localState.map(counter => (
          <React.Fragment>
            {
              counter.id==5?
              <NewCounter
              key={counter.id}
              id={counter.id}
              value={counter.value}
              changeVal={this.changeVal}
              />:<Counter
                key={counter.id}
                id={counter.id}
                value={counter.value}
                onIncrement = {this.onIncrement}
                onDecrement={this.onDecrement}
                />
            }
         
         
            </React.Fragment>
         
        ))}
        <Total total_counter={this.state.localState}/>
      </div>
    );
  }
}

export default App;