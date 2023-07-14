import {createAction} from '@reduxjs/toolkit';
import EnumActionRole from './EnumActionRole';

abstract class VActions<S extends string, R extends EnumActionRole> {
	/** Should be same with Slice.name **/
	abstract readonly scope: S;
	abstract readonly role: R;

	private _prepareActionCreator<PA extends PrepareActionWithMetaAndError<any, any, any>, OT>(
		prepareAction: PA,
		{role, originalType}: IPrepareActionCreatorOptions<OT>,
	): ExtraPrepareAction<PA, OT> {
		return (...args: any[]) => {
			const {payload, meta, error} = prepareAction(...args);

			return {
				payload,
				error: error ?? false,
				meta: {
					...(meta ?? {}),
					role,
					originalType,
					isProcessedAction: true,
				},
			};
		};
	}

	private defaultPrepareActionCreator<P = any, M = any, E = any>(): PrepareActionWithMetaAndError<P, M, E> {
		return (payload: P, meta?: M, error?: E) => ({payload, meta, error});
	}

	protected createAction<PA extends PrepareActionWithMetaAndError<any, any, any>, T extends string = never>(
		type: T,
		prepareAction?: PA,
	) {
		const prepareActionDefault = this.defaultPrepareActionCreator<
			ReturnType<PA>['payload'],
			ReturnType<PA>['meta'],
			ReturnType<PA>['error']
		>();

		return createAction(
			`${this.scope}/${type}/${this.role}`,
			this._prepareActionCreator(prepareAction ?? prepareActionDefault, {
				role: this.role,
				originalType: type,
			}),
		);
	}
}

export abstract class ServerToClientActions<S extends string = string> extends VActions<
	S,
	EnumActionRole.SERVER_TO_CLIENT
> {
	readonly role = EnumActionRole.SERVER_TO_CLIENT;
}

export abstract class ClientToServerActions<S extends string = string> extends VActions<
	S,
	EnumActionRole.CLIENT_TO_SERVER
> {
	readonly role = EnumActionRole.CLIENT_TO_SERVER;
}

export abstract class ClientOnlyActions<S extends string = string> extends VActions<S, EnumActionRole.CLIENT_ONLY> {
	readonly role = EnumActionRole.CLIENT_ONLY;

	protected createAction<PA extends PrepareActionWithMetaAndError<any>, T extends string = never>(
		type: T,
		prepareAction?: PA,
	) {
		return super.createAction<PA, T>(type, prepareAction);
	}
}

type ExtraPrepareAction<PA extends PrepareActionWithMetaAndError<any, any, any>, OT> = (...args: Parameters<PA>) => {
	payload: ReturnType<PA>['payload'];
	meta: ReturnType<PA>['meta'] & IPrepareActionCreatorOptions<OT>;
	error: boolean | ReturnType<PA>['error'];
};

export type PrepareActionWithMetaAndError<P, M = any, E = any> = (...args: any[]) => {
	payload: P;
	meta?: M;
	error?: E;
};

interface IPrepareActionCreatorOptions<OT> {
	role: EnumActionRole;
	originalType: OT;
}
