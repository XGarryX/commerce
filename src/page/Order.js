import React, { Component } from 'react'
import axios from 'axios'
import Image from '../components/Image'
import orderStatus from '../config/orderStatus'
import {} from '../config/api'
import { langTable } from '../config/lang'
import { apiPath, imgPath } from '../config/api'
import '../style/page/Order.less'

class Order extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)
        this.handleIdChange = this.handleIdChange.bind(this)

        this.state = {
            state: 1,
            progress: '0%',
            isSearching: false,
            isLoading: false,
            orderId: '',
            data: []
        }
    }
    time2Date(time) {
        let date = new Date(time)
        const toDouble = num => num > 9 ? num : '0' + 9
        return `${date.getFullYear()}/${toDouble(date.getMonth() + 1)}/${toDouble(date.getDate())} ${toDouble(date.getHours())}:${toDouble(date.getMinutes())}:${toDouble(date.getSeconds())}`
    }
    handleSearch() {
        const { orderId } = this.state
        if(orderId){
            axios.get(`${apiPath}/business/order/user/list?id=${orderId}`)
            .then(({data = {}}) => {
                const { list = [{}] } = data
                const [orderInfo = {}] = list
                const { lang } = langTable[orderInfo.lang || ''] || {}
                lang && import(`../language/${lang}/order.js`)
                .then(language => {
                    this.setState({
                        isLoading: false,
                        orderInfo,
                        language
                    })
                })
            })
            this.setState({
                isSearching: true,
                isLoading: true
            })
        }
    }
    handleIdChange({target:{value}}) {
        this.setState({
            orderId: value
        })
    }
    componentDidMount() {
        const orderId = window.location.pathname.split('/')[2]
        orderId && this.setState({
            orderId
        }, this.handleSearch)
    }
    render() {
        const { state } = this.state
        // const width = 100 / stateList.length
        // const step = stateList.findIndex(item => item.state == state)
        const detail = [{
            key: 'id',
        }, {
            key: 'buyTimeInfo',
            render: (buyTimeInfo = {}) => buyTimeInfo.buyTime
        }, {
            key: 'name',
        }, {
            key: 'allPrice',
            render: allPrice => allPrice / 100
        }]
        const { isSearching, isLoading, orderInfo = {}, orderId, language = {} } = this.state
        const { orderInfiL } = language
        const { payStatus, more = {}, products = [{product:{more:{}}}] } = orderInfo
        return(
            <div className="order">
                <div className="order-search" style={{height: isSearching && '60px'}}>
                    <div className="search-bar">
                        <button className="search-button" onClick={this.handleSearch}>search</button>
                        <div className="search-box">
                            <input className="search-input" placeholder="orderNumber" value={orderId} onChange={this.handleIdChange} />
                        </div>
                    </div>
                    <span className="fix-middle"></span>
                </div>
                {isSearching && !isLoading && orderInfo && <div className="order-info">
                    <div className="state-block">
                        <h1 className="order-state">{orderStatus[payStatus]}</h1>
                    </div>
                    {/* <div className="state-bar">
                        <ul className="state-list">
                            {stateList.map((item, index) => {
                                const isPass = index <= step
                                return (
                                    <li className={`state${isPass ? ' active' : ''}`} style={{width: width + '%'}} key={index} >
                                        <span>{item.name}</span>
                                        {isPass && <div className="state-time">03月28日 13:38</div>}
                                    </li>
                                )
                            })}
                        </ul>
                    </div> */}
                    <div className="product">
                        <div className="product-img">
                            <Image src={imgPath + products[0].product.more.bannerImgs.split(",")[0].replace('\\.', '.')} error=""/>
                        </div>
                        <div className="product-name">
                            <span className="name">{products[0].product.name}</span>
                            <span className="price">{products[0].product.price / 100} x {products[0].count}</span>
                        </div>
                    </div>
                    <div className="order-detail">
                        <div className="detail-title">
                            <h1 className="title-text">{orderInfiL.title}</h1>
                        </div>
                        <div className="detail-block">
                            {detail.map(({key, render}) => {
                                return(
                                    <p className="detail-item" key={key}>
                                        <span className="item-name">{orderInfiL[key]}:</span>
                                        <span className="item-value">{render ? render(orderInfo[key], orderInfo) : orderInfo[key]}</span>
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>}
                {isSearching && isLoading && <div className="tips">
                    加载中...
                </div>}
                {isSearching && !orderInfo && <div className="tips">
                    无次订单...
                </div>}
            </div>
        )
    }
}

export default Order
