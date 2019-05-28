import React, { Component } from 'react'
import axios from 'axios'
import Title from './components/Title'
import SwiperContainer from './components/SwiperContainer'
import Detail from './components/Detail'
import Attrs from './components/Attrs'
import RollingBoard from './components/RollingBoard'
import { titles, detailText, footer, notice } from './config/traditional'
import './style/App.less'
import './style/icon.less'

const attrs = {
  "matchVos" : [{
    "matchOne":[{
      "name":"颜色",
      "value": "红"
    }, {
      "name":"大小",
      "value": "L"
    }, {
      "name": "类型",
      "value": "圆领" 
    }]
  }, {
    "matchOne":[{
      "name":"颜色",
      "value": "绿"
    }, {
      "name":"大小",
      "value": "XL"
    }, {
      "name": "类型",
      "value": "V领" 
    }]
  }]
}

class App extends Component {
  constructor(props) {
    super(props)

    this.handleAttrChoice = this.handleAttrChoice.bind(this)
    this.handleInfoChange = this.handleInfoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  state = {
    loadding: true,
    hasFail: false,
    info: {
      count: 1,
      name: '',
      phone: '',
      area: '',
      address: '',
      Email: '',
      message: ''
    }
  }
  handleSubmit() {
    console.log(this.state)
  }
  toHash(hash) {
    if(requestAnimationFrame){
      const elm = document.body.querySelector(hash)
      if(elm){
        const getElmTop = element => {
  　　　　var actualTop = element.offsetTop
  　　　　var current = element.offsetParent
  　　　　while (current !== null){
  　　　　　　actualTop += current.offsetTop
  　　　　　　current = current.offsetParent
  　　　　}
  　　　　return actualTop
    　　}
        const emlTop = getElmTop(elm)
        const parent = (document.documentElement.scrollTop += 1) && document.documentElement.scrollTop ? document.documentElement : document.body
        const step = (emlTop - parent.scrollTop) / 10
        requestAnimationFrame(function move(){
          if(Math.abs(parent.scrollTop - emlTop) < 10){
            parent.scrollTop = emlTop
            return
          }
          parent.scrollTop += step
          requestAnimationFrame(move)
        })
      }
    }else{
      window.location.replace(hash)
    }
  }
  handleAttrChoice(attr, value) {
    const { info, info: { selection = {} } } = this.state
    info.selection = Object.assign(selection, {
      [attr]: value
    })
    this.setState({
      info
    })
  }
  handleInfoChange(name, value) {
    const { info } = this.state
    this.setState({
      info: Object.assign(info, {
        [name]: value
      })
    })
  }
  hideLoading() {
    this.loadding.style.opacity = "0"
    this.loadding.addEventListener('transitionend', () => {
      this.setState({
        loadding: false
      })
    })
  }
  componentDidMount() {
    axios.get('http://localhost:8081/api/business/product/info/01b598d2aba34568abc938b725738936')
      .then(({data}) => {
        this.setState(data, this.hideLoading)
      })
      .catch(err => this.setState({hasFail: true}))
      let obj = {}
      attrs.matchVos.forEach(({matchOne}) => {
        matchOne.forEach(({name, value}) => {
          let attr = obj[name] = obj[name] || []
          attr.push(value)
        })
      })
      this.setState({
        attrs: obj
      })
  }
  render() {
    const { loadding, hasFail, name, more, price, attrs, info } = this.state
    const discount = 20
    return (
      <div className="app">
        {loadding && <div className="loading-cover" ref={ref => this.loadding = ref}>
          <div className="loading-block">
            <span className="icon-heart heartbeat"></span>
            <h2>{hasFail ? 'fail' : 'Loading...'}</h2>
          </div>
          <span className="middler"></span>
        </div>}
        {!loadding && <div className="content">
          <header>
            <h1 className="header-title">{name}</h1>
          </header>
          <div className="block">
            <Title title={titles.productPic} />
            <SwiperContainer images={more.bannerImgs.split(",")}/>
          </div>
          <div className="block">
            <Title title={titles.detail} />
            <Detail
              title={name}
              {...detailText}
              currentPrice={price}
              originalPrice={price / ((100 - discount) * 0.01)}
              sold={99}
              discount={discount}
              handleClick={() => this.toHash("#order")}
            />
          </div>
          <div className="block text-block">
            <Title title={titles.attributes} />
            <div className="innerText" dangerouslySetInnerHTML={{__html: more.details.text.replace(/\<\simg/g, "<img")}}></div>
          </div>
          <div className="block" id="order">
            <Title title={titles.orderInfo} />
            <div className="order-title">
              <i className="icon-shopping-cart"></i>
              <h2>{name}</h2>
            </div>
            <Attrs
              attrs={attrs}
              handleAttrChoice={this.handleAttrChoice}
              handleInfoChange={this.handleInfoChange}
              info={info}
              price={info.count * price}
              handleSubmit={this.handleSubmit}
            />
            <div className="order-title">
              <i className="icon-cart-plus"></i>
              <h2>{titles.newOrders}</h2>
            </div>
            <RollingBoard style={{height: '250px'}} />
          </div>
          <div className="block">
            <Title title={titles.notice} />
            <div dangerouslySetInnerHTML={{__html: notice}}></div>
          </div>
          <footer>
            <div className="toTop" onClick={() => this.toHash("#root")}>
              <i className="icon-chevron-thin-up"></i><br />
              top
            </div>
            <div className="toBuy" onClick={() => this.toHash("#order")}>
              {footer.buyNow}
            </div>
            <div className="inquiry">{footer.order}</div>
          </footer>
        </div>}
      </div>
    )
  }
}

export default App
