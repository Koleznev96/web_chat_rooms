import IRootState from '../../IRootState';

type TPropsWithRestaurantId = {
	ids: number[];
};

export const getProductsIdsFromProps = (_: IRootState, props: TPropsWithRestaurantId) => props.ids;
