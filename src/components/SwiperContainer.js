import React, { Component } from 'react'
import Image from './Image'
import '../style/components/SwiperContainer.less'

class SwiperContainer extends Component {
    constructor(props) {
        super(props)
        this.handleDown = this.handleDown.bind(this)
        this.handleMove = this.handleMove.bind(this)
        this.handleUp = this.handleUp.bind(this)
        this.handleTansitionend = this.handleTansitionend.bind(this)
    }
    state = {
        hasDown: false,
        page: 0,
        startX: null,
        pointX: 0,
        canStart: true
    }
    handleDown(e) {
        if(this.state.canStart){
            this.setState({
                hasDown: true,
                startX: {
                    x: e.clientX,
                    time: new Date().getTime()
                }
            })
        }
    }
    handleMove(e) {
        if(this.state.hasDown){
            const { width, images: { length } } = this.props
            const nowX = -this.state.page * width
            let moveX = e.clientX - this.state.startX.x
            if((nowX === 0 && moveX > 0) || (nowX === (length - 1) * (-width) && moveX < 0)){
                moveX /= 10
            }
            this.setState({
                pointX: nowX + moveX
            })
            e.stopPropagation()
        }
    }
    handleUp(e) {
        if(this.state.hasDown){
            const { width, images: {length} } = this.props
            let { startX: { time, x }, page } = this.state
            const moveX = e.clientX - x
            const left = moveX % width
            if(new Date().getTime() - time < 300 && Math.abs(moveX) > 100){
                moveX > 0 ? page--: page++
            }else{
                page -= parseInt(moveX / width)
                if(Math.abs(left) > width / 2){
                    left > 0 ?
                        page > 0 && page-- :
                        page < length - 1 && page++
                }
            }
            page = page < 0 ? 0 : page
            page = page > length - 1 ? length - 1 : page
            this.setState({
                hasDown: false,
                startX: null,
                page,
                pointX: -page * width,
                canStart: false
            })
        }
    }
    handleTansitionend() {
        this.setState({
            canStart: true
        })
    }
    componentDidMount() {
        window.addEventListener('mousemove', this.handleMove)
        window.addEventListener('mouseup', this.handleUp)
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMove)
        window.removeEventListener('mouseup', this.handleUp)
    }
    render() {
        const { width, images } = this.props
        return (
            <div className="swiper-container" style={{height: width}}>
                <ul
                    className="swiper-wrapper"
                    style={{
                        width: `${width * images.length}px`,
                        transform: `translateX(${this.state.pointX}px)`,
                        transitionDuration: this.state.hasDown ? '0s' : '.3s',
                        willChange: `${this.state.hasDown ? 'transform' : ''}`
                    }}
                    onTransitionEnd={this.handleTansitionend}
                >
                {
                    images.map((item, index) => (
                        <li className="swiper-slide" key={index} style={{width, lineHeight: `${width}px`}}>
                            <Image src={item} alt={index}/>
                        </li>
                    ))
                }
                </ul>
                <ul className="promo-nav">
                {
                    images.map((item, index) => (
                        <li className={this.state.page == index ? 'active' : ''} key={index}></li>
                    ))
                }    
                </ul>
                <div className="mask" onMouseDown={this.handleDown}></div>
            </div>
        )
    }
}

export default SwiperContainer
