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
        const { src, alt } = this.props
        const img = this.img
        img.src = src
        img.alt = alt
        img.onload = () => {
            this.setState({loadding: false})
        }
    }
    handleError() {

    }
    componentDidMount() {
        const img = new Image()
        this.setState({img})
        img.src = this.props.src
        img.onload = this.handleLoad
        img.onerror = this.handleError
    }
    componentWillUnmount() {
        const { img } = this.state
        img.onload = null
        img.onerror = null
    }
    render() {
        const { loadding } = this.state
        return (
            <div className="image">
                {loadding && <span className="icon-heart heartbeat"></span>}
                <img
                    style={{
                        visibility: `${loadding ? 'hidden' : ''}`
                    }}
                    ref={ref => this.img = ref}/>
            </div>
        )
    }
}

export default Images
