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
                    <li>
                        <Image src={item} alt={item} key={item}/>
                    </li>
                ))
            }
            </ul>
        )
    }
}

export default ProductInfo
