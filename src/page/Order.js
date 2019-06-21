import React, { Component } from 'react'
import Image from '../components/Image'
import '../style/page/Order.less'

const stateList = [{
    state: 0,
    name: '下单',
    tipStr: '已下单',
}, {
    state: 1,
    name: '配货',
    tipStr: '配货中',
}, {
    state: 2,
    name: '出库',
    tipStr: '已出库',
}, {
    state: 3,
    name: '送达',
    tipStr: '已送达',
}, {
    state: 4,
    name: '交易完成',
    tipStr: '已送达',
}]

class Order extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)

        this.state = {
            state: 1,
            progress: '0%',
            isSearching: false
        }
    }
    time2Date(time) {
        let date = new Date(time)
        const toDouble = num => num > 9 ? num : '0' + 9
        return `${date.getFullYear()}/${toDouble(date.getMonth() + 1)}/${toDouble(date.getDate())} ${toDouble(date.getHours())}:${toDouble(date.getMinutes())}:${toDouble(date.getSeconds())}`
    }
    handleSearch() {
        this.setState({
            isSearching: true
        })
    }
    componentDidMount() {
        const { state, isSearching } = this.state
    }
    render() {
        const { state } = this.state
        const width = 100 / stateList.length
        const step = stateList.findIndex(item => item.state == state)
        const detail = [{
            key: 'id',
            name: '订单编号',
        }, {
            key: 'createTime',
            name: '创建时间',
            render: time => this.time2Date(time)
        }, {
            key: 'postTime',
            name: '发货时间',
            render: time => time && this.time2Date(time)
        }]
        const data = {
            id: '8e01c7f181e446d797127aa7f5d69eb2',
            createTime: 1560136907000,
        }
        const { isSearching } = this.state
        return(
            <div className="order">
                <div className="order-search" style={{height: isSearching && '60px'}}>
                    <div className="search-bar">
                        <button className="search-button" onClick={this.handleSearch}>搜索</button>
                        <div className="search-box">
                            <input className="search-input" placeholder="请输入订单号"/>
                        </div>
                    </div>
                    <span className="fix-middle"></span>
                </div>
                {isSearching && <div className="order-info">
                    <div className="state-block">
                        <h1 className="order-state">已下单</h1>
                    </div>
                    <div className="state-bar">
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
                    </div>
                    <div className="product">
                        <div className="product-img">
                            <Image src="http://image.garry.fun/image/product/e5de04b20833409c9fe39b05d7be2d6b1553747017(1).jpg" error=""/>
                        </div>
                        <div className="product-name">
                            <span className="name">红米NOTE5全网通版</span>
                            <span className="price">1599元 x 1</span>
                        </div>
                    </div>
                    <div className="order-detail">
                        <div className="detail-title">
                            <h1 className="title-text">订单信息</h1>
                        </div>
                        <div className="detail-block">
                            {detail.map(({key, name, render}) => {
                                return(
                                    <p className="detail-item" key={key}>
                                        <span className="item-name">{name}:</span>
                                        <span className="item-value">{render ? render(data[key], data) : data[key]}</span>
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default Order
