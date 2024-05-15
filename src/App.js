import './App.css';
import React, { useEffect, useState } from 'react'
import Logo from './logo.jpeg'
import Currency from './Currency.png'
import axios from 'axios';

function App() {
  let [amount,setAmount] = useState(0)
  let [from,setFrom] = useState("usd")
  let [to,setTo] = useState("inr")
  let [info,setInfo] = useState([])
  let [options,setOptions] = useState([])
  let [output,setOutput] = useState()

  useEffect(()=>{
    axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
      .then(res => {
      setInfo(res.data[from])
    }).catch(err => console.log(err))

  },[from])

  useEffect(()=>{
    setOptions(Object.keys(info))
  },[info])

  let Convert = ()=> {
    let rate = info[to]
    setOutput(amount * rate)
  }

  return (
    <div className="App">
      <div className="converter">
      <div className="heading">
        <h3><img src={Logo} alt="" className='logo'/>Currency Converter</h3>

      </div>


        <div className='container'>
          <div className='left'>
            <h4>Amount</h4>
            <input type='text' placeholder='Enter Amount' 
            onChange={(event)=> setAmount(event.target.value)}/>
          </div>
            
          <div className='middle'>
            <h4>From</h4>
            <select onChange={(event)=> setFrom(event.target.value)} value={from}>
              {options.map(o =>(
                <option value={o}>{o}</option>
              ))}
            </select>

          </div>
          <div className='right'>
          <h4>To</h4>
            <select  onChange={(event)=> setTo(event.target.value)} value={to}>
            {options.map(o =>(
                <option value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className='result'>
            <h4>Converted Amount</h4>
            <h5>{amount + " " + from + " = " + output + " " + to}</h5>
            <button className='btn' onClick={Convert}>Convert</button>
          </div>

        </div>
      </div>
      

      <div className="img">
        <img src={Currency} className='currency' alt=""/>
      </div>
    </div>
  );
}

export default App;





