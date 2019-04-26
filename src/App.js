import React, { Component } from 'react'
import WidthWatcher from './components/WidthWatcher'
import Title from './components/Title'
import SwiperContainer from './components/SwiperContainer'
import Detail from './components/Detail'
import ProductInfo from './components/ProductInfo'
import './style/App.less'
import './style/icon.less'

class App extends Component {
  state = {
    title: 'LED瓶塞燈【一組三入】',
    images: [
      'http://us.meibolikeji.com/photos/20190115/1547522640485.jpg-cn',
      'http://us.meibolikeji.com/photos/20190115/1547522661246.jpg-cn',
      'http://us.meibolikeji.com/photos/20190115/1547522652797.jpg-cn',
    ],
    productInfo: [
      'http://us.meibolikeji.com/pro/20181211/1544499383481.jpg-cn',
      'http://us.meibolikeji.com/pro/20181211/1544499402808.jpg-cn',
      'http://us.meibolikeji.com/pro/20181211/1544499465413.jpg-cn',
      'http://us.meibolikeji.com/pro/20181229/1546057244376.jpg-cn',
    ],
    detail: {
      originalPrice: "1580",
      currentPrice: "780",
      unit: "NT$",
      discount: "-51%",
      sold: 986,
    },
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
    const { title, images, detail, productInfo } = this.state
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
          <div className="block">
            <Title title="限时下杀" />
            <Detail {...detail} title={title} />
          </div>
          <div className="block">
            <Title title="商品属性" />
            <ProductInfo images={productInfo} />
          </div>
          <div className="block">
            <Title title="订单信息" />
          </div>
        </div>
      </div>
    )
  }
}

export default App
