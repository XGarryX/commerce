import React, { Component } from 'react'
import '../style/components/WidthWatcher.less'

class WidthWatcher extends Component {
    constructor(props) {
        super(props)
        this.handleScroll = this.handleScroll.bind(this)
    }
    handleScroll = (() => {
        let _lastWidth = 0
        return e => {
            const { target } = e
            const thisWidth = target.offsetWidth
            const { handleResize } = this.props
            if(thisWidth > _lastWidth){
                this.watcher.querySelector('.watcher-parent.decrease').scrollLeft = 1000 * 1000
            }else if(thisWidth < _lastWidth){
                this.watcher.querySelector('.watcher-parent.plus').scrollLeft = 1000 * 1000
            }
            _lastWidth = thisWidth
            handleResize && handleResize(thisWidth)
        }
    })()
    componentDidMount() {
        [...this.watcher.querySelectorAll('.watcher-parent')].forEach(item => {
            item.addEventListener('scroll', this.handleScroll)
            item.scrollLeft = 1000 * 1000
        })
    }
    componentWillUnmount() {
        [...this.watcher.querySelectorAll('.watcher-parent')].forEach(item => {
            item.removeEventListener('scroll', this.handleScroll)
        })
    }
    render() {
        return (
            <div className="container" ref={ref => this.watcher = ref}>
                <div className="watcher-parent plus">
                    <div
                        className="watcher-child"
                        style={{width: 1000}}
                    ></div>
                </div>
                <div className="watcher-parent decrease">
                    <div className="watcher-child"></div>
                </div>
            </div>
        )
    }
}

export default WidthWatcher
