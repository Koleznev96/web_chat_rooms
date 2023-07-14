import React from 'react';

import Select, {StylesConfig} from 'react-select';
import makeAnimated from 'react-select/animated';

type Props = {
	data_list: any[];
	list_label: string;
	list_value: string;
	curent_value: any | null;
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

export default function SelectOne(props: Props) {
	const {data_list, list_label, list_value, curent_value, onChange} = props;
	const select_list = data_list
		.filter((item) => curent_value !== item[list_value])
		.map((item) => ({value: item[list_value], label: item[list_label]}));

	const slice = data_list.find((item) => curent_value === item[list_value]);

	const curent_value_data = {
		value: curent_value,
		label: slice ? slice[list_label] : null,
	};

	const updateDataChange = (value: any) => {
		onChange(value.value);
	};

	return (
		<Select
			onChange={updateDataChange}
			components={animatedComponents}
			value={curent_value ? curent_value_data : null}
			options={select_list}
			styles={colourStyles}
			isLoading={props.isLoading}
		/>
	);
}
