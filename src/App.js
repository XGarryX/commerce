import React, { Component } from 'react'
import axios from 'axios'
import Title from './components/Title'
import SwiperContainer from './components/SwiperContainer'
import Detail from './components/Detail'
import ProductInfo from './components/ProductInfo'
import RollingBoard from './components/RollingBoard'
import { titles, detailText, footer } from './config/traditional'
import './style/App.less'
import './style/icon.less'

class App extends Component {
  state = {
    loadding: true,
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
      discount: "-51%",
      sold: 986,
    },
    orderList: [{
      name: '趙 **（089***6851）',
      time: 8,
      title: 'LED瓶塞燈【一組三入】',
    }, {
      name: '張 **（089***3590） ',
      time: 3,
      title: 'LED瓶塞燈【一組三入】',
    }, {
      name: '李 **（087***3943） ',
      time: 4,
      title: 'LED瓶塞燈【一組三入】',
    }, {
      name: '王 **（099***4865） ',
      time: 11,
      title: 'LED瓶塞燈【一組三入】',
    }, {
      name: '林 **（062***3291） ',
      time: 14,
      title: 'LED瓶塞燈【一組三入】',
    }, {
      name: '鄭 **（098***6851） ',
      time: 1,
      title: 'LED瓶塞燈【一組三入】',
    },],
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
  hideLoading() {
    this.loadding.style.opacity = "0"
    this.loadding.addEventListener('transitionend', () => {
      this.setState({
        loadding: false
      })
    })
  }
  componentDidMount() {
    // axios.get('http://localhost:8081/api/business/product/info/01b598d2aba34568abc938b725738936')
    //   .then(({data}) => {
    //     this.setState({
    //       data
    //     }, this.hideLoading)
    //   })
    //   .catch(err => console.log(err))
    setTimeout(() => this.hideLoading(), 500)
  }
  render() {
    const { title, images, detail, productInfo, orderList, loadding } = this.state
    return (
      <div className="app">
        {loadding && <div className="loading-cover" ref={ref => this.loadding = ref}>
          <div className="loading-block">
            <span className="icon-heart heartbeat"></span>
            <h2>Loading...</h2>
          </div>
          <span className="middler"></span>
        </div>}
        <div className="content">
          <header>
            <h1 className="header-title">{title}</h1>
          </header>
          <div className="block">
            <Title title={titles.productPic} />
            <SwiperContainer images={images}/>
          </div>
          <div className="block">
            <Title title={titles.detail} />
            <Detail {...detail} title={title} {...detailText} handleClick={() => this.toHash("#order")}/>
          </div>
          <div className="block">
            <Title title={titles.attributes} />
            <ProductInfo images={productInfo} />
          </div>
          <div className="block" id="order">
            <Title title={titles.orderInfo} />
            <div className="order-title">
              <i className="icon-shopping-cart"></i>
              <h2>{title}</h2>
            </div>
            <div className="order-title">
              <i className="icon-cart-plus"></i>
              <h2>{titles.newOrders}</h2>
            </div>
            <RollingBoard style={{height: '250px'}} orderList={orderList}/>
          </div>
          <div className="block">
            <Title title={titles.notice} />
            <article>
              <p className="node-text">本產品的實際使用效果根據個人情況決定，不保證每位用戶都能享受到所宣傳的效果。若有疑問請諮詢在線客服或通過電子郵箱聯絡我們，本公司享有最終解釋權。</p>
              <p className="node-title">·關於發貨方式</p>
              <p className="node-text">配送範圍全台灣。</p>
              <p className="node-title">·關於配送時間</p>
              <p className="node-text">下單成功之後，我們會按照下單先後順序進行配貨，配貨週期為3個工作日左右，一般到達時間為7個工作日左右。</p>
              <p className="node-title">·如何申請退換貨</p>
              <p className="node-text">1.由於質量原因產生的退換貨：至收到商品之日起7天內，向售後服務中心發送郵件至sales@leiseethegood.com，客服會在收到郵件后的1-3個工作日內受理您的請求，退換貨所產生的運費由我方承擔。。</p>
              <p className="node-title">2.退換貨流程:</p>
              <p className="node-text">確認收貨—申請退換貨—客服審核通過—用戶寄回商品—倉庫簽收驗貨—退換貨審核—退款/換貨；退換貨請註明：訂單號、姓名、電話。</p>
              <p className="node-title">·如何取消訂單</p>
              <p className="node-text">取消訂單需要向售後服務中心發送郵件并注明相关原因，邮件内容应註明您的訂單號、姓名、電話。</p>
            </article>
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
        </div>
      </div>
    )
  }
}

export default App
