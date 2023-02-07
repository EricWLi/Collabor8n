import { useState } from 'react';
import { Pencil, Eraser, Square, Circle, Palette, ArrowCounterclockwise, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

function Toolbar({ onToolChange, onUndo }) {
  const [open, setOpen] = useState(true);

  function toggleToolbar() {
    setOpen(!open);
  }

  let content;

  if (open) {
    content = (
      <div className='toolbar'>
        <div className='toolbar-item tool-pencil' onClick={onToolChange}><Pencil /></div>
        <div className='toolbar-item tool-eraser' onClick={onToolChange}><Eraser /></div>
        <div className='toolbar-item tool-square' onClick={onToolChange}><Square /></div>
        <div className='toolbar-item tool-circle' onClick={onToolChange}><Circle /></div>
        <div className='toolbar-item tool-palette'><Palette /></div>
        <div className='toolbar-item tool-undo' onClick={onUndo}><ArrowCounterclockwise /></div>
        <div className='toolbar-item tool-collapse' onClick={toggleToolbar}><ChevronLeft />
      </div>
    </div>
    );
  } else {
    content = (
      <div className='toolbar-toggle'>
        <ChevronRight className='toolbar-expand' onClick={toggleToolbar} />
      </div>
    );
  }

  return (
    <div className='toolbar-container'>
      {content}
    </div>
  );
}

export default Toolbar;