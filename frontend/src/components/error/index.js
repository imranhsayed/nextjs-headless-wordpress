import PropTypes from 'prop-types';
import cx from 'classnames';
import {isEmpty} from 'lodash';

const ErrorMessage = ( { text, classes } ) => {
  if ( isEmpty( text ) ) {
    return null;
  }

  return (
    <div className={cx( 'bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4', classes )} role="alert">
      <p>{ text }</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  text: PropTypes.string,
  classes: PropTypes.string
};

export default ErrorMessage;
