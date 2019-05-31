import React, { Component } from 'react'
import '../style/components/RollingBoard.less'

class RollingBoard extends Component {
    render() {
        const { orderList = [], style, name } = this.props
        return (
            <div className="rolling-board" style={style}>
                <div className="board-content">
                    <ul className="order-list" style={{
                        animationDuration: `${orderList.length * 2}s`
                    }}>
                    {
                        [...orderList, ...orderList].map((item, index) => (
                            <li key={index}>
                                <span>{item.name}</span>
                                <span className="time">{item.time}分钟前</span>
                                <br/>
                                <span>{name}</span>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

export default RollingBoard
