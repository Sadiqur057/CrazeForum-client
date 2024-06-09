import { ImSpinner3 } from 'react-icons/im';
import PropTypes from 'prop-types';

const LoadingSpinner = ({heightClass}) => {
  const heightLength = heightClass? heightClass : 'h-screen' ;
  console.log("height",heightLength)
  return (
    <p className={`${heightLength} dark:bg-gray-900 dark:text-white flex justify-center items-center gap-2 z-30`}><ImSpinner3 className="animate-spin"></ImSpinner3>Loading...</p>
  );
};



LoadingSpinner.propTypes = {
  heightClass: PropTypes.string
};

export default LoadingSpinner;