import React from 'react'
import { request } from './request'
import { Cat } from './Components/Cat'
import { Link, Route, Switch } from 'react-router-dom'
import { Cart } from './Components/Cart'
import { SortBar } from './Components/SortBar'

export class Storage extends React.Component {
  state = {
    cats: [],
    boughtItem: [],
    amount: 0,
    offset: 12,
    prevOffset:12,
    sortValue: 'desc',
    sortValues: ['price', 'gen', 'cooldown', 'age'],
    selectedSort: 'current_price',
    sortCount: 1,
  }
  
  async getRequest () {
    const cats = await request('current_price',this.state.offset, this.state.sortValue);
    this.setState({
      cats: cats.kitties,
    })
  }

  async componentDidUpdate(){
    if(this.state.prevOffset !== this.state.offset){
      const cats = await request('current_price',this.state.offset, this.state.sortValue);
      for(let value of cats.kitties){
        this.state.cats.push(value)
      }
      this.setState({
        prevOffset: this.state.offset,
      })
    }
  }
   
  componentDidMount () {
    this.getRequest()
  }
 
  setSort = (value) => {
    this.setState({
    selectedSort: value
    },this.sortF)
  }

  setCountSort = () => {
    let sortValue = ['desc', 'asc']
    let sortVariabe = sortValue[this.state.sortCount % 2]
    this.setState(state=>({
      sortCount: state.sortCount +1,
      sortValue: sortVariabe,
    }))
    this.sortF(sortVariabe)
  }

  async sortF (sortVariabe){
  if(this.state.selectedSort === 'gen'){
    const cats = await request('generation', this.state.offset, sortVariabe || this.state.sortValue  || 'desc');
      this.setState({
        cats: cats.kitties,
    })
  }
  if(this.state.selectedSort === 'price'){
    const cats = await request('current_price', this.state.offset, sortVariabe || this.state.sortValue || 'desc');
      this.setState({
        cats: cats.kitties,
    })
  }
  if(this.state.selectedSort === 'age'){
    const cats = await request('age', this.state.offset, sortVariabe || this.state.sortValue  || 'desc');
      this.setState({
        cats: cats.kitties,
    })
  }
  if(this.state.selectedSort === 'cooldown'){
    const cats = await request('cooldown', this.state.offset, sortVariabe || this.state.sortValue || 'desc');
      this.setState({
        cats: cats.kitties,
    })
  }
  if(this.state.selectedSort === 'current_price'){
    const cats = await request('current_price', this.state.offset, sortVariabe || this.state.sortValue || 'desc');
      this.setState({
        cats: cats.kitties,
    })
  }
  }
  
  render() {
    const { sortValues, selectedSort } = this.state
    return(
      <div className="wrapper" >
        <Link className="link" to="/">Storage</Link>
        <Link className="link" to="/Cart">Cart</Link>
        <Switch>
          <Route path="/Cart">
            <Cart 
              boughtItem={this.state.boughtItem}
              amount={this.state.amount}
              deleteItem={this.deleteItem}
            />
          </Route>
          <Route path="/">
            <SortBar 
              setSort={this.setSort}
              sortValues={sortValues}
              selectedSort={selectedSort}
              setCountSort={this.setCountSort}
            />
            {this.state.cats.length >= 0 ? (
              <>
                <Cat  
                  cats={this.state.cats}
                />
                <button 
                  className="btn-more"
                  onClick={() => {
                    this.setState(state => ({
                      offset: state.offset +12,
                  })
                )
                }}>Load more</button>
              </>
            ):(
              <h1>Loading Date</h1>
            )}
          </Route>
        </Switch>
      </div>
    )
  }
}