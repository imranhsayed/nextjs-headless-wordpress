import Nav from "./nav";
import {isEmpty} from 'lodash'

const Header = ({headerMenus}) => {

	if ( isEmpty(headerMenus) ) {
		return null;
	}

	return (
		<header>
			<Nav headerMenus={headerMenus}/>
		</header>
	)
}

export default Header
