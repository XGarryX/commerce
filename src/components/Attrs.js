import React, { Component } from 'react'
import Counter from './Counter'
import { attrs as language } from '../config/traditional'
import { cash } from '../config/traditional'
import '../style/components/Attrs.less'

class Attrs extends Component {
    constructor(props) {
        super(props)

        this.handleLess = this.handleLess.bind(this)
        this.handleMore = this.handleMore.bind(this)
    }
    state = {}
    handleLess() {
        const MINCOUNT = 1
        const { handleInfoChange, info: { count } } = this.props
        count - 1 >= MINCOUNT && handleInfoChange('count', count - 1)
    }
    handleMore() {
        const MAXCOUNT = 9
        const { handleInfoChange, info: { count } } = this.props
        count + 1 <= MAXCOUNT && handleInfoChange('count', count + 1)
    }
    renderPayWay(way) {
        switch(way){
            case 'cash':
                return(<div className="payway">
                    <div className="payment-type">{cash.inner}</div>
                    <div className="advantage">{cash.advantage}</div>
                </div>)
        }
    }
    render() {
        const { price, attrs, info, handleInfoChange, handleAttrChoice, handleSubmit } = this.props
        const keys = Object.keys(attrs)
        const { priceL, countL, nameL, phoneL, aeraL, addressL, EmailL, messageL, payWayL, submitL } = language
        const infoConfig = [{
            name: 'price',
            title: priceL,
            must: true,
            render: () => <span>{price}</span>
        }, {
            name: 'count',
            title: countL,
            must: true,
            render: () => <Counter handleLess={this.handleLess} handleMore={this.handleMore} count={info.count} />
        }, {
            name: 'name',
            title: nameL.title,
            placeholder: nameL.placeholder,
            must: true,
        }, {
            name: 'phone',
            title: phoneL.title,
            placeholder: phoneL.placeholder,
            must: true,
        }, {
            name: 'area',
            title: aeraL,
            must: true
        }, {
            name: 'address',
            title: addressL.title,
            placeholder: addressL.placeholder,
            must: true
        }, {
            name: 'Email',
            title: EmailL.title,
            placeholder: EmailL.placeholder,
            must: false
        }, {
            name: 'message',
            title: messageL.title,
            placeholder: messageL.placeholder,
            must: false
        }, {
            name: 'payway',
            title: payWayL,
            must: true,
            render: () => this.renderPayWay('cash')
        }, ]
        return (
            <div className="attrs-block">
                <div className="attrs-inner"> 
                    {
                        keys.map((key, index) => (
                            <div className="attrs-item" key={index}>
                                <label className="attr-name must">{key}</label>
                                <div className="attrs-values">
                                {
                                    attrs[key].map((item, index) => (
                                        <span
                                            key={index}
                                            onClick={() => handleAttrChoice && handleAttrChoice(key, item)}
                                            className={`attr-value${info.selection && info.selection[key] == item ? ' active' : ''}`}
                                        >
                                            {item}
                                        </span>
                                    ))
                                }
                                </div>
                            </div>
                        ))
                    }
                    {infoConfig.map(({name, title, placeholder, must, render}) => {
                        return (
                            <div className="attrs-item" key={name}>
                                <label className={`attr-name${must ? ' must' : ''}`}>{title}</label>
                                <div className="attrs-values">
                                {render ? render() :
                                    <input type="text" className="inputText" placeholder={placeholder} value={info[name]} onChange={e => handleInfoChange && handleInfoChange(name, e.target.value)} />
                                }
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="submit">
                    <button onClick={handleSubmit}>{submitL}</button>
                </div>
            </div>
        )
    }
}

export default Attrs
