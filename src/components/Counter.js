import React, { Component } from 'react'
import '../style/components/Counter.less'

class Counter extends Component {

    render() {
        const { count = 1, handleLess, handleMore } = this.props
        return (
            <div className="counter">
                <div onClick={handleLess} className="less">-</div>
                <div className="textWrap">
                    <span>{count}</span>
                </div>
                <div onClick={handleMore} className="more">+</div>
            </div>
        )
    }
}

export default Counter
