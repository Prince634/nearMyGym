import Header from '../components/Header.js'

import React, {Component} from 'react';
import faker from 'faker';

class ProductsList extends React.PureComponent {

  render(){
  	console.log('product list renders');
  	const products = this.props.products.map((product, index) => {
	    return <Product key={index} product={product} onProductChanged={this.props.onProductChanged} />
	  });

	  return (
	      <ul>
	        {products}
	      </ul>
	  );
  }
  
};


class PureChild extends React.PureComponent {
  render() {
    console.log('rendering PureChild')
    return <div>{this.props.value}</div>
  }
}

class Product extends React.PureComponent {

  // UNCOMMENT THE METHOD BELOW TO SEE THE PERFORMANCE IMPROVEMENT
     // shouldComponentUpdate(nextProps) {
     //    console.log('nextProps is', nextProps.product===this.props.product);
     //    return nextProps.product != this.props.product;
    	
     //  }

  render() {
    const {product} = this.props;

    // Log to demonstrate how render is run and to make render slower
    // so the visual lag is visible
    console.log("Product::render");

    return (
        <li>{this.props.data}
          <img style={{'maxWidth': '80%'}} src={product.url}/>
          <h3>{product.title}</h3>
          <input type="checkbox" checked={product.isFavourite}
                 onChange={() => this.props.onProductChanged({...product, isFavourite: !product.isFavourite})}/>
        </li>
    );
  }
}
const dataLayer = {id:'22', title:'HEy Prince', url:'http://lorempixel.com/640/480', isFavourite:false}
class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      products: this.generateRandomList(600),
      time: 100,
      id: null,
      abc:'pppppp',
      url:{id:'22', title:'HEy Prince', url:'http://lorempixel.com/640/480', isFavourite:false}
    }
  }



  generateRandomList(length) {
    const randomList = [];

    for(let i=0; i<length; i++) {
      randomList.push({
        id: faker.random.uuid(),
        title: faker.company.companyName(),
        url: faker.image.imageUrl(),
        isFavourite: false
      });
    }

    return randomList;
  }

  handleProductChanged=(changedProduct) =>{
    let newProducts = this.state.products.map((product) => {
      if(product.id == changedProduct.id) {
        return changedProduct;
      }

      return product;
    });

    this.setState({ products: newProducts });
  }
  setTime(){
  	let timer = setInterval(()=>{
  		console.log('aaab');
  		this.setState({time: this.state.time+1, id: timer})
  	},100)
  }

  componentWillUnmount(){
  	if(this.state.id){
  		clearInterval(this.state.id);
  	}
  }

  render() {
    return (
      <div>
		<Header {...this.props}/>
		<p>Profile Page</p>
		<button className="colr" onClick={()=>this.props.history.push('/')}>Go To Home Page</button>
		<button className="colr" onClick={()=>this.setTime()}>START TIMER {this.state.time}</button>
        <ProductsList products={this.state.products} onProductChanged={this.handleProductChanged}/>
        {/*<Product data ={this.state.abc} product={{id:'22', title:'HEy Prince', url:'http://lorempixel.com/640/480', isFavourite:false}}/>
        */}<PureChild value="Prince"/>
      </div>
    );
  }
}

export default App;