import React, { Component } from 'react'
import '../style/components/Image.less'

class Images extends Component {
    constructor(props) {
        super(props)
        this.handleLoad = this.handleLoad.bind(this)
        this.handleError = this.handleError.bind(this)
    }
    state = {
        loadding: true
    }
    handleLoad() {
        this.setState({loadding: false})
    }
    handleError() {

    }
    render() {
        const { loadding } = this.state
        const { src, alt } = this.props
        return (
            <div className="component-image">
                {loadding && <span className="icon-heart heartbeat"></span>}
                <img
                    style={{
                        visibility: `${loadding ? 'hidden' : ''}`
                    }}
                    src={src}
                    alt={alt}
                    onLoad={this.handleLoad}
                    onError={this.handleError}
                />
            </div>
        )
    }
}

export default Images
