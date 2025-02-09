import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loader = () => {
  return <FontAwesomeIcon icon={faSpinner} spin />;
};

export default Loader;
