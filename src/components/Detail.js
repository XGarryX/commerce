import React, { Component } from 'react'
import '../style/components/Detail.less'

class Detail extends Component {
    render() {
        const { originalPrice, currentPrice, unit, discount, sold, title } = this.props
        return (
            <div className="details-all">
                <ul className="price">
                    <li className="current-price">
                        <span className="unit">{unit}</span>
                        <span className="currentPrice">{currentPrice}</span>
                    </li>
                    <li className="other">
                        <div className="originalPrice">
                            <span>原价:</span>
                            <del>
                                <span>{unit}</span>
                                <span> {originalPrice}</span>
                            </del>
                        </div>
                        <div className="discount">{discount}</div>
                        <div className="sold">已售:{sold}</div>
                    </li>
                </ul>
                <div className="details-title">
                    <h2>{title}</h2>
                </div>
                <div className="service">
                    <span className="freePostage">免邮费</span>
                    <span className="cash">货到付款</span>
                </div>
                <div className="buy-now">
                    <button>立即购买</button>
                </div>
            </div>
        )
    }
}

export default Detail
