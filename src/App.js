import React, { Component } from 'react'
import WidthWatcher from './components/WidthWatcher'
import Title from './components/Title'
import SwiperContainer from './components/SwiperContainer'
import './style/App.less'
import './style/icon.less'

class App extends Component {
  state = {
    title: 'LED瓶塞燈【一組三入】',
    images: [
      'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    ]
  }
  handleMutation(...args) {
    console.log(args)
  }
  handleResize(contnetWidth) {
    this.setState({contnetWidth})
  }
  componentDidMount() {
    const observer = new MutationObserver(this.handleMutation)
    const contentElm = document.body.querySelector(".content")
    observer.observe(contentElm, {
      attributes: true,
      attributeFilter: ['style']
    })
    this.setState({observer})
  }
  componentWillUnmount() {
    this.state.observer.disconnect()
  }
  render() {
    const { title, images } = this.state
    return (
      <div className="app">
        <div className="content">
          <header>
            <h1 className="header-title">{title}</h1>
          </header>
          <div className="block">
            <Title title="商品图片" />
            <SwiperContainer images={images} width={this.state.contnetWidth}/>
            <WidthWatcher handleResize={this.handleResize.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
