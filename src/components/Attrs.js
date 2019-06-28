import React, { Component } from 'react'
import Counter from './Counter'
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
        const { language = {cash: {}} } = this.props
        switch(way){
            case 'cash':
                return(<div className="payway">
                    <div className="payment-type">{language.cash.inner}</div>
                    <div className="advantage">{language.cash.advantage}</div>
                </div>)
        }
    }
    render() {
        const { price, attrs = [], info, handleInfoChange, handleAttrChoice, handleSubmit, lang, language = {attrs:{}} } = this.props
        const { priceL, countL, nameL, phoneL, aeraL, addressL, zipCodeL, EmailL, messageL, payWayL, submitL } = language.attrs
        const infoConfig = [{
            name: 'price',
            title: priceL,
            must: true,
            render: () => <span>{price / 100}</span>
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
            name: 'lang',
            title: aeraL,
            render: () => <select><option value={lang.key}>{lang.name}</option></select>,
            must: true
        }, {
            name: 'address',
            title: addressL.title,
            placeholder: addressL.placeholder,
            must: true
        }, {
            name: 'zipCode',
            title: zipCodeL.title,
            placeholder: zipCodeL.placeholder,
            must: false
        }, {
            name: 'email',
            title: EmailL.title,
            placeholder: EmailL.placeholder,
            must: false
        }, {
            name: 'mark',
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
                        attrs.map(({attrName, attrValues, specificationNameId}) => (
                            <div className="attrs-item" key={specificationNameId}>
                                <label className="attr-name must">{attrName}</label>
                                <div className="attrs-values">
                                {
                                    attrValues.map(({specificationValueId, value, id}) => (
                                        <span
                                            key={specificationValueId}
                                            onClick={() => handleAttrChoice && handleAttrChoice(specificationNameId, id)}
                                            className={`attr-value${info.selection && info.selection[specificationNameId] == id ? ' active' : ''}`}
                                        >
                                            {value}
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
