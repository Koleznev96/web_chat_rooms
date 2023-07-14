import {createSelector as selectorCreator, ParametricSelector} from 'reselect';

export const createSelector = ((
	...args: [ParametricSelector<unknown, unknown, unknown>[], (...res: unknown[]) => unknown]
) => selectorCreator.apply(selectorCreator, args)) as typeof selectorCreator;
