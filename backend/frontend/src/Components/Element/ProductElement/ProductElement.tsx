import React, {useCallback, useEffect} from 'react';
import _ from 'lodash';

import './ProductElement.scss';
import '../../../UIKit/Theme/Styles/_fonts_global.scss';
import {Product, Categories} from '../../../Lib/Redux/Products/slice';

type TProductElementProps = {
	itemClickHandler: (item: Product) => void;
	item: Product;
	isInBasket: boolean;
	itemClickBasket: (item: Product) => void;
};

const ProductElement = (props: TProductElementProps) => {
	const {itemClickHandler, item, isInBasket, itemClickBasket} = props;
	return (
		<div onClick={() => itemClickHandler(item)} key={item.id} className="product-list__item">
			<img className="product-list__item__img" src={item.image} />
			<div className="product-list__item__header">
				<div className="product-list__item__header__name CustomFontMedium">{item.name}</div>
				<div className="product-list__item__header__status -is-online CustomFontRegular">
					{item.categories?.map((cat: Categories) => (
						<div key={cat.id} className="product-list__item__header__cat">
							{cat.name}
						</div>
					))}
				</div>
			</div>
			<div className="product-list__item__address CustomFontRegular">{item.short_desc}</div>
			<div className='product-list__item__add' onClick={(e) => {
e.stopPropagation();
itemClickBasket(item);
			}}>{isInBasket ? 'Удалить' : 'В корзину'}</div>
		</div>
	);
};

export default ProductElement;
