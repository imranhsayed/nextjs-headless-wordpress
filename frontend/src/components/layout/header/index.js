import Nav from './nav';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types'

const Header = ( {header, headerMenus, slug} ) => {

	if ( isEmpty( headerMenus ) ) {
		return null;
	}

	return (
		<header>
			<Nav header={header} headerMenus={headerMenus} slug={slug}/>
		</header>
	);
};

Header.propTypes = {
  header: PropTypes.object,
  headerMenus: PropTypes.array,
  slug: PropTypes.string
};

Header.defaultProps = {
  header: {},
  headerMenus: [],
  slug: ''
};

export default Header;
