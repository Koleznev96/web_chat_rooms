import React, {useEffect, useState} from 'react';

import Select, {StylesConfig} from 'react-select';
import makeAnimated from 'react-select/animated';

type Props = {
	data_list: any[];
	list_label: string;
	list_value: string;
	curent_value: any[];
	onChange: (value: any) => void;
	isLoading?: boolean;
};

const animatedComponents = makeAnimated();

interface DataOption {
	readonly value: string;
	readonly label: string;
	readonly isFixed?: boolean;
	readonly isDisabled?: boolean;
}

const colourStyles: StylesConfig<DataOption> = {
	control: (styles) => ({
		...styles,
		minHeight: 34,
		backgroundColor: 'white',
		borderColor: '#879eb1',
		borderRadius: 6,
	}),
};

export default function SelectMultiple(props: Props) {
	const {data_list, list_label, list_value, curent_value, onChange} = props;

	const select_list = data_list
		.filter((item) => curent_value.indexOf(item[list_value]) === -1)
		.map((item) => ({value: item[list_value], label: item[list_label]}));

	const curent_value_list = data_list
		.filter((item) => curent_value.indexOf(item[list_value]) !== -1)
		.map((item) => ({value: item[list_value], label: item[list_label]}));

	const updateDataChange = (value: any) => {
		const new_curent_value = value.map((item: any) => item.value);
		onChange(new_curent_value);
	};

	return (
		<Select
			onChange={updateDataChange}
			// closeMenuOnSelect={false}
			components={animatedComponents}
			value={curent_value_list}
			isMulti
			options={select_list}
			styles={colourStyles}
			isLoading={props.isLoading}
		/>
	);
}
