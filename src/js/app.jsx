import React from 'react';
import '../css/styles.scss'




export default class App extends React.Component {


  constructor(props)
  {
   super(props);

   this.state={balance:'', APR:'' , term:'', payment: ''};

   this.handleCalChange = this.handleCalChange.bind(this);

   this.balChange = this.balChange.bind(this);
   this.APRChange = this.APRChange.bind(this);
   this.termChange= this.termChange.bind(this);

   this.calculate = this.calculate.bind(this);

  }

  balChange(event){
    this.setState({balance: event.target.value});

  }

  APRChange(event){

    this.setState({APR: event.target.value});

  }

  termChange(event){
    this.setState({term: event.target.value});

  }
  
  handleCalChange(event){

    event.preventDefault();
    const balance = this.state.balance;
    const rate = this.state.APR;
    const term =  this.state.term;

    const payment = this.calculate(balance,rate,term);

    this.setState({payment: `${payment} Your monthly payment `});
  }


 

  calculate(balance, rate , term){  
    
    const calTerm = term * 12;
    
    const calRate= rate / 100 / 12;

    const top = calRate* ( 1+ calRate ) ** calTerm;

    const bottom= ((1+calRate)** calTerm) - 1;

    const monthly = parseFloat(balance * (top/bottom)).toFixed(2);
    
    return monthly;
     
  }



  
  // your Javascript goes here
  render() {
    return (
      <div className='container'>
        
        {/* your JSX goes here */

          <form className="form-horizontal">
            
            <div className="form-group">
                <label htmlFor="inputEmail3" className= 'labeler' >Loan Balance</label>
              
              <div className="Mortgage"> 
                <input type="number" name="balance"  value= {this.state.balance} onChange = {this.balChange}
                className="form-control" id="inputLoanBalance" placeholder="mortgage loan balance" ></input>
              </div> 
            </div>

            <div className="form-group">
            <label htmlFor="inputPassword3" id= 'labeler' className= 'label1' > Annual Percentage Rate</label>
            
            <div className="percentageRate">
              <input name="rate" type="number" step="0.01" value= {this.state.APR} onChange = {this.APRChange}
              className="form-control" id="inputRate" placeholder="annual percentage rate"></input>
            </div> 
          </div>

          <select name="selection" type= 'number' value= {this.state.term} onChange = {this.termChange}>

            <option value="15">15 year loan term</option>
            <option value="30">30 year loan term</option>
          </select>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">

              <button name= 'submit' className="btn btn-default" onClick= {this.handleCalChange}>Calculate</button>

            </div>
          </div>

          <div name="output" id="output" onClick= {this.handleCalChange}><p>
            {this.state.payment}</p></div>
          </form>
          
        }


        <title>'Mortgage Calculator' </title>
        
      </div>
    );
  }
}


