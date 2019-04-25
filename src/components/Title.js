import React, { Component } from 'react'
import '../style/components/Title.less'

class Title extends Component {
    render() {
        const { theme = 'light', title } = this.props
        return (
            <div className={`title ${theme}`}>
                <i className="vertical"></i>
            <h2>{title}</h2>
        </div>
        )
    }
}

export default Title
