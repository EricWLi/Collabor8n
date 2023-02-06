function Toolbar({ onToolChange }) {
  return (
    <div className="toolbar">
        <button className="tool-pen"></button>
        <button className="tool-eraser"></button>
        <button className="tool-rectangle"></button>
        <button className="tool-circle"></button>
        <div className="tool-brushsize">
            <input type="range" min="1" max="10" className="slider" onChange={(e) => onToolChange(e.target.value)} />
        </div>
    </div>
  );
}

export default Toolbar;