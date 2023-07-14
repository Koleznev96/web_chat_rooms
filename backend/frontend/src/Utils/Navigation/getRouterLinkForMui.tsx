import React, {forwardRef} from 'react';
import {Link, LinkProps} from 'react-router-dom';

const getRouterLinkForMui = (linkProps: LinkProps) => {
	return forwardRef<HTMLAnchorElement>((props, ref) => <Link {...props} {...linkProps} role={undefined} ref={ref} />);
};

export default getRouterLinkForMui;
