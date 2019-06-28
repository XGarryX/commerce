import React, { Component } from 'react'
import Image from './Image'
import WidthWatcher from './WidthWatcher'
import { imgPath } from '../config/api'
import '../style/components/SwiperContainer.less'

class SwiperContainer extends Component {
    constructor(props) {
        super(props)
        this.handleDown = this.handleDown.bind(this)
        this.handleMove = this.handleMove.bind(this)
        this.handleUp = this.handleUp.bind(this)
    }
    state = {
        hasDown: false,     //是否处于点击中状态
        page: 0,            //当前页数
        startX: null,       //点击位置和时间
        translateX: 0,      //整体位移距离
    }
    //开始点击
    handleDown(e) {
        const { clientX } = e.type.match('touch') ? e.touches[0] : e
        this.setState({
            hasDown: true,
            startX: {
                x: clientX,
                time: new Date().getTime()
            }
        })
    }
    //拖动
    handleMove(e) {
        if(this.state.hasDown){
            const { contnetWidth, page, startX: { x } } = this.state
            const { clientX } = e.type.match('touch') ? e.touches[0] : e
            const { images: { length } } = this.props
            const nowX = -page * contnetWidth
            let moveX = clientX - x
            if((nowX === 0 && moveX > 0) || (nowX === (length - 1) * (-contnetWidth) && moveX < 0)){
                moveX /= 10
            }
            this.setState({
                translateX: nowX + moveX
            })
            e.stopPropagation()
        }
    }
    //松开
    handleUp(e) {
        if(this.state.hasDown){
            const { clientX } = e.type.match('touch') ? e.changedTouches[0] : e
            const { images: {length} } = this.props
            let { contnetWidth, startX: { time, x }, page } = this.state
            const moveX = clientX - x
            const left = moveX % contnetWidth
            if(new Date().getTime() - time < 300 && Math.abs(moveX) > 50){
                moveX > 0 ? page--: page++
            }else{
                page -= parseInt(moveX / contnetWidth)
                if(Math.abs(left) > contnetWidth / 2){
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
                translateX: -page * contnetWidth
            })
        }
    }
    //阻止图片拖动
    handleDrap(e) {
        e.preventDefault()
    }
    //父级宽度改变
    handleResize(contnetWidth) {
        this.setState({
            contnetWidth,
            translateX: -this.state.page * contnetWidth
        })
    }
    componentDidMount() {
        window.addEventListener('mousemove', this.handleMove)
        window.addEventListener('mouseup', this.handleUp)
        window.addEventListener('touchmove', this.handleMove)
        window.addEventListener('touchend', this.handleUp)
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMove)
        window.removeEventListener('mouseup', this.handleUp)
        window.removeEventListener('touchmove', this.handleMove)
        window.removeEventListener('touchend', this.handleUp)
    }
    render() {
        const { images } = this.props
        const { contnetWidth } = this.state
        return (
            <div
                className="swiper-container"
                style={{height: contnetWidth}}
                onMouseDown={this.handleDown}
                onTouchStart={this.handleDown}
            >
                <ul
                    className="swiper-wrapper"
                    style={{
                        width: `${contnetWidth * images.length}px`,
                        transform: `translateX(${this.state.translateX}px)`,
                        transitionDuration: this.state.hasDown ? '0s' : '.3s',
                        willChange: `${this.state.hasDown ? 'transform' : ''}`
                    }}
                    onMouseDown={this.handleDrap}
                >
                {
                    images.map((item, index) => (
                        <li className="swiper-slide" key={index} style={{width: `${contnetWidth}px`, lineHeight: `${contnetWidth}px`}}>
                            <Image src={imgPath + item.replace('\\.', '.')} alt={index}/>
                        </li>
                    ))
                }
                </ul>
                <ul className="promo-nav">
                {
                    images.map((item, index) => (
                        <li className={this.state.page === index ? 'active' : ''} key={index}></li>
                    ))
                }    
                </ul>
                <WidthWatcher handleResize={this.handleResize.bind(this)} />
            </div>
        )
    }
}

export default SwiperContainer
