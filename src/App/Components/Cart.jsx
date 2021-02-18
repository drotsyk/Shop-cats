import React from 'react'

const bigNubmer = 1000000000000000000;

export class Cart extends React.Component {
  state = {
    arrFromLocal: null,
    amount: 0,
  }

  priceСalculation = () => {
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    while ( i-- ) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    this.setState({
      arrFromLocal:values,
    })
    for(let value of values){
      this.setState(state => ({
        amount: state.amount + (value.auction.current_price / bigNubmer)
      }))
    }
  }

  componentDidMount(){
    this.priceСalculation()
  }

  deleteItem = (catId, catPrice) => {
    localStorage.removeItem(`${catId}`)
    this.setState(state => ({
      arrFromLocal: state.arrFromLocal.filter(item => 
        item.id !== catId),
      amount: 0,
    }))
    this.priceСalculation()
  }

  render(){
    const { arrFromLocal, amount } = this.state
    return(
      <>
      {arrFromLocal === null ?(
        <h1>Total cost: 0</h1>
      ):(
        <h1>Total cost: {amount > 999999 ? (
          '999999+'
        ):(
          amount
        )} $</h1>
      )}
        {arrFromLocal === null ? (
          <h2>Loading items</h2>
        ):(
          <ul className="catsList">
            {arrFromLocal.map((cat, index ) =>(
              <li key={index} className='catsItem'>
                <img src={cat.image_url} alt=""/>
                <div><b>Age:</b> {cat.id}</div>
                <div><b>Name:</b> {cat.name}</div>
                <div><b>Price: </b>{
                  (cat.auction.current_price / bigNubmer).toFixed(3).replace(/\.?0+$/, '')
                }
                  $
                </div>
                <button onClick={() => 
                  this.deleteItem(cat.id, cat.auction.current_price / bigNubmer)
                }>
                  Delele
                </button>
              </li>
            ))}
          </ul>
        )}
    </>
    )
  }
}

