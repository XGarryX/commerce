import React, { Component } from 'react'
import axios from 'axios'
import Title from '../components/Title'
import SwiperContainer from '../components/SwiperContainer'
import Detail from '../components/Detail'
import Attrs from '../components/Attrs'
import RollingBoard from '../components/RollingBoard'
import { titles, detailText, footer, notice } from '../config/traditional'
import { apiPath } from '../config/api'
import message from '../public/message'
import '../style/page/Shop.less'
import '../style/icon.less'

class Shop extends Component {
  constructor(props) {
    super(props)

    this.handleAttrChoice = this.handleAttrChoice.bind(this)
    this.handleInfoChange = this.handleInfoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  state = {
    loadding: true,
    failMsg: null,
    info: {
      count: 1,
      name: '',
      phone: '',
      area: '',
      address: '',
      zipCode: '',
      Email: '',
      message: ''
    },
    orderList: [{
      name: '趙 **（089***6851）',
      time: 8,
    }, {
      name: '張 **（089***3590） ',
      time: 3,
    }, {
      name: '李 **（087***3943） ',
      time: 4,
    }, {
      name: '王 **（099***4865） ',
      time: 11,
    }, {
      name: '林 **（062***3291） ',
      time: 14,
    }, {
      name: '鄭 **（098***6851） ',
      time: 1,
    },],
  }
  handleSubmit() {
    const { info, matchs } = this.state
    const { id } = this.props.match.params
    let idArr = Object.values(info.selection || {})
    let params = {}
    let productMatchId = null
    if(!id) return
    const paramsCheck = [{
      name: 'phone', must: true, msg: '请填写手机'
    }, {
      name: 'name', must: true, msg: '请填写姓名'
    }, {
      name: 'email', must: false
    }, {
      name: 'mark', must: false
    }] 
    for(let i = 0;i < matchs.length;i++){
      const {id, matchOne} = matchs[i]
      const res = matchOne.filter(({specificationMatchId}) => {
        return idArr.includes(specificationMatchId)
      })
      if(res.length == idArr.length && res.length == matchOne.length){
        productMatchId = id
        break
      }
    }
    if (!productMatchId && matchs.length > 0) {
      message('请选择产品参数')(1000)
      return
    }
    for(let i = 0;i < paramsCheck.length;i++){
      const { name, must, msg } = paramsCheck[i]
      const value = info[name]
      if(!value && must){
        message(msg)(1000)
        return
      }
      params[name] = value
    }
    if(!info.address) {
      message('请填写地址')(1000)
      return
    }
    params.addressVo = {
      addressInfo: info.address
    }
    params.products = [{
      productId: id,
      count: info.count,
      productMatchId
    }]
    params.more = { zipCode: info.zipCode }
    const msgCb = message('购买中..')
    axios.post(`${apiPath}/business/order/buy`, params)
      .then(({data}) => {
        if(data && data.resultCode != "200") {
          throw({message: data.resultMessage})
        }
        msgCb(0)
        message('购买成功')(1000, () => window.location.reload())
      })
      .catch(err => {
        msgCb(0)
        message(err.message)(1000)
      })
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
  searchOrder() {
    window.location.pathname = 'order'
  }
  setSpec(spec) {
    let attrsObj = {}
    let attrs = []
    spec.forEach(({specificationNameId, specificationValueId, id, name, value}) => {
        let attr = attrsObj[specificationNameId]
        if(!attr){
            attr = attrsObj[specificationNameId] = {
                attrName: name,
                specificationNameId,
                must: false,
                attrValues: []
            }
            attrs.push(attr)
        }
        attr.attrValues.push({
          id,
          specificationValueId,
          value
        })
    })
    return attrs
  }
  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`${apiPath}/business/product/info/${id}`)
      .then(({data}) => {
        if(data.resultCode != "200") {
          throw({message: data.resultMessage})
        }
        data.attrs = this.setSpec(data.spec)
        this.setState(data, this.hideLoading)
      })
      .catch(({message}) => this.setState({
          failMsg: message
        }))
  }
  render() {
    const { loadding, failMsg, name, more = {}, price, attrs, info, orderList, matchs } = this.state
    const { bannerImgs = '', details = {} } = more
    const discount = 20
    return (
      <div className="app">
        {loadding && <div className="loading-cover" ref={ref => this.loadding = ref}>
          <div className="loading-block">
            <span className="icon-heart heartbeat"></span>
            <h2>{failMsg || 'Loading...'}</h2>
          </div>
          <span className="middler"></span>
        </div>}
        <div className=""></div>
        {!loadding && <div className="content">
          <header>
            <h1 className="header-title">{name}</h1>
          </header>
          <div className="block">
            <Title title={titles.productPic} />
            <SwiperContainer images={bannerImgs.split(",")}/>
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
            <div className="innerText" dangerouslySetInnerHTML={{__html: details.text && details.text.replace(/\<\simg/g, "<img")}}></div>
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
            <RollingBoard style={{height: '250px'}} orderList={orderList} name={name} />
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
            <div className="inquiry" onClick={this.searchOrder}>{footer.order}</div>
          </footer>
        </div>}
      </div>
    )
  }
}

export default Shop
