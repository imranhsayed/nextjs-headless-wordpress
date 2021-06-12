import PropTypes from 'prop-types';
import cx from 'classnames';

const Loading = ( { message, classes, contentColorClass, showSpinner, showMessage, visible, hasVisibilityToggle } ) => {
  return (
    <div className={cx( classes, {'invisible': ! visible && hasVisibilityToggle} )}>
      <div className="inline-flex rounded-md shadow-sm ml-8">
        <div
          className={cx(contentColorClass, 'inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed')}
        >
          { showSpinner ? (
            <svg className={cx( contentColorClass, 'animate-spin -ml-1 mr-3 h-5 w-5')} xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          ) : null }
          { showMessage ? message : null }
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.string,
  contentColorClass: PropTypes.string,
  message: PropTypes.string,
  showMessage: PropTypes.bool,
  showSpinner: PropTypes.bool,
  visible: PropTypes.bool,
  hasVisibilityToggle: PropTypes.bool
};

Loading.defaultProps = {
  classes: '',
  contentColorClass: 'text-gray-600',
  message: 'Loading...',
  showMessage: true,
  showSpinner: false,
  visible: false,
  hasVisibilityToggle: true
};

export default Loading;
