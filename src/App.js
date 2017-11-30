import React, { Component } from 'react';
import TableRow from "./tableRow";
import axios from 'axios';
import io from 'socket.io-client';
import './App.css';

const socket = io();

class App extends Component {
  constructor(){
    super();

    this.state = {
      coins: [{
        long: '...',
        short: '...',
        mktcap: '...',
        price:'...',
        vwapData: '...',
        supply: '...',
        volume: '...',
        cap24hrChange: '...'
      }]
    }
  }


  componentDidMount(){
    axios.get('http://coincap.io/front').then(coinResp => {
      this.setState({
        coins: coinResp.data
      })
    })
    const cryptoSocket = io.connect('ws://socket.coincap.io');
    cryptoSocket.on('trades', (tradeMsg) => {
      console.log('trading')
      this.state.coins.find( coin => {
        if (coin.short === tradeMsg.coin){
          let x = this.state.coins.findIndex((coin,i,a) => {
            return coin.short === tradeMsg.coin
          })
          this.setState((prevState) => {
            Object.assign(prevState.coins[x], tradeMsg.msg)
            return {
              coins: prevState.coins
            }
          })
          
        }
    })
  })
}


  handleStateChange(tradeMsg){
    var x = this.state.coins.findIndex(function(e,i,a){
      return e.short === tradeMsg.short
    })

  }

  render() {
    console.log('state', this.state, 'props', this.props)
    let mappedCoins = this.state.coins.map((coin, index) => <TableRow key={index} coinData={coin}/>)
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
            <th>Name</th>
              <th >Market Cap</th>
              <th >Price</th>
              <th >24Hour VWAP</th>
              <th >Available Supply</th>
              <th >24Hour Volume</th>
              <th >%24hr</th>
            </tr>
          </thead>
          <tbody>
            {mappedCoins}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
