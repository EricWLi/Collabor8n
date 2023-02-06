import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faEraser, faPencil, faSquare } from '@fortawesome/free-solid-svg-icons';

function Toolbar({ onToolChange }) {
  return (
    <div className="toolbar">
        <div className="tool-pen"><FontAwesomeIcon icon={faPencil}/></div>
        <div className="tool-eraser"><FontAwesomeIcon icon={faEraser} /></div>
        <div className="tool-rectangle"><FontAwesomeIcon icon={faSquare} /></div>
        <div className="tool-circle"><FontAwesomeIcon icon={faCircle} /></div>
        {/* <div className="tool-brushsize">
            <input type="range" min="1" max="10" className="slider" onChange={(e) => onToolChange(e.target.value)} />
        </div> */}
    </div>
  );
}

export default Toolbar;