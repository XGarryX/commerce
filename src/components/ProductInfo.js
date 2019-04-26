import React, { Component } from 'react'
import Image from './Image'
import '../style/components/ProductInfo.less'

class ProductInfo extends Component {
    render() {
        const { images } = this.props
        return (
            <ul className="product-info">
            {
                images.map(item => (
                    <li key={item}>
                        <Image src={item} alt={item}/>
                    </li>
                ))
            }
            </ul>
        )
    }
}

export default ProductInfo
