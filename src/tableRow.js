import React, { Component } from 'react'

class TableRow extends Component {
  render () {
      let coinData = this.props.coinData
    return (
        <tr>
        <td>{`${coinData.long} (${coinData.short})`}</td>
        <td >${coinData.mktcap.toLocaleString()}</td>
        <td >${coinData.price.toLocaleString()}</td>
        <td >${coinData.vwapData.toLocaleString()}</td>
        <td >{coinData.supply.toLocaleString()}</td>
        <td >${coinData.volume.toLocaleString()}</td>
        <td >{coinData.cap24hrChange}%</td>
    </tr>
    )
  }
}

export default TableRow