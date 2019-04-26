import React, { Component } from 'react'
import Image from './Image'
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
            const { clientX } = e.type.match('touch') ? e.touches[0] : e
            const { width, images: { length } } = this.props
            const nowX = -this.state.page * width
            let moveX = clientX - this.state.startX.x
            if((nowX === 0 && moveX > 0) || (nowX === (length - 1) * (-width) && moveX < 0)){
                moveX /= 10
            }
            this.setState({
                translateX: nowX + moveX
            })
            e.stopPropagation()
            e.preventDefault()
        }
    }
    //松开
    handleUp(e) {
        e.preventDefault()
        if(this.state.hasDown){
            const { clientX } = e.type.match('touch') ? e.changedTouches[0] : e
            const { width, images: {length} } = this.props
            let { startX: { time, x }, page } = this.state
            const moveX = clientX - x
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
                translateX: -page * width
            })
        }
    }
    //阻止图片拖动
    handleDrap(e) {
        e.preventDefault()
    }
    //页面宽度改变
    componentWillReceiveProps(newProps) {
        const newW = newProps.width
        const oldW = this.props.width
        if(newW !== oldW){
            this.setState({
                translateX: -this.state.page * newW
            })
        }
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
        const { width, images } = this.props
        return (
            <div
                className="swiper-container"
                style={{height: width}}
                onMouseDown={this.handleDown}
                onTouchStart={this.handleDown}
            >
                <ul
                    className="swiper-wrapper"
                    style={{
                        width: `${width * images.length}px`,
                        transform: `translateX(${this.state.translateX}px)`,
                        transitionDuration: this.state.hasDown ? '0s' : '.3s',
                        willChange: `${this.state.hasDown ? 'transform' : ''}`
                    }}
                    onMouseDown={this.handleDrap}
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
                        <li className={this.state.page === index ? 'active' : ''} key={index}></li>
                    ))
                }    
                </ul>
            </div>
        )
    }
}

export default SwiperContainer
