import React, { Component } from 'react'
import { cash, freePost } from '../config/traditional'
import '../style/components/Detail.less'

class Detail extends Component {
    state = {
        offer: ['freePost', 'isCash', ]
    }
    renderOffer(type) {
        switch(type){
            case 'freePost':
                return (<span className="freePostage" key="freePost">
                    <span>{freePost.keyWord}</span>
                    {freePost.inner}
                </span>)
            case 'isCash':
                return (<span className="cash" key="isCash">
                    <span>{cash.keyWord}</span>
                    {cash.inner}
                </span>)
        }
    }
    render() {
        const { offer } = this.state
        const { originalPrice, currentPrice, unit, discount, sold, soldText, title, price, buyNow, handleClick } = this.props
        return (
            <div className="details-all">
                <ul className="price">
                    <li className="current-price">
                        <span className="unit">{unit}</span>
                        <span className="currentPrice">{currentPrice}</span>
                    </li>
                    <li className="other">
                        <div className="originalPrice">
                            <span>{price}:</span>
                            <del>
                                <span>{unit}</span>
                                <span> {originalPrice}</span>
                            </del>
                        </div>
                        <div className="discount">-{discount}%</div>
                        <div className="sold">{soldText}:{sold}</div>
                    </li>
                </ul>
                <div className="details-title">
                    <h2>{title}</h2>
                </div>
                <div className="service">
                {
                    offer.map(item => this.renderOffer(item))        
                }
                </div>
                <div className="buy-now">
                    <button onClick={handleClick}>{buyNow}</button>
                </div>
            </div>
        )
    }
}

export default Detail
