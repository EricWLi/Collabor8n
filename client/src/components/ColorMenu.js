import { useContext } from 'react';
import { ToolContext } from './Whiteboard';

function ColorMenu({ handleToolChange }) {
  const tool = useContext(ToolContext);

  const colorPallette = [
    '#000000',
    '#404040',
    '#FF0000',
    '#FF6A00',
    '#FFD800',
    '#B6FF00',
    '#4CFF00',
    '#00FF21',
    '#00FF90',
    '#00FFFF',
    '#0094FF',
    '#0026FF',
    '#4800FF',
    '#B200FF',
    '#FF00DC',
    '#FF006E'
  ];

  function handleColorChange(color) {
    handleToolChange({
      ...tool,
      color: color
    });
  }

  let colorButtons = colorPallette.map(color =>
    <button
      key={color}
      style={{ backgroundColor: color }}
      onClick={() => handleColorChange(color)}
    >
    </button>
  );

  return (
    <div className="toolbar-menu-color">
      {colorButtons}
      <input type="color" value={tool.color} onInput={(event) => handleColorChange(event.target.value)} />
    </div>
  );
}

export default ColorMenu;