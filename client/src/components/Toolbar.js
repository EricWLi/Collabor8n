import { useState, useContext } from 'react';
import { Pencil, Eraser, Palette, ArrowCounterclockwise, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import ToolbarMenu from './ToolbarMenu';
import { ToolContext } from './Whiteboard';

function Toolbar({ handleToolChange, handleUndo }) {
  const [open, setOpen] = useState(true);
  const [currentMenu, setCurrentMenu] = useState(null);
  const tool = useContext(ToolContext);

  function toggleToolbar() {
    if (open) {
      setCurrentMenu(null);
    }

    setOpen(!open);
  }

  function handleMenuClick(selected) {
    // Close menu if the selected menu is already open
    setCurrentMenu((selected === currentMenu) ? null : selected);
  }

  function handlePenClick() {
    if (tool.name === 'pen') {
      handleMenuClick('pen');
    }

    handleToolChange({ name: 'pen' });
  }

  function handleEraserClick() {
    handleToolChange({ name: 'eraser' });
  }

  let content;

  if (open) {
    // Show sidebar menu.
    content = (
      <div className='toolbar-container'>
        <div className='toolbar'>
          <div className='toolbar-item tool-pencil' onClick={handlePenClick}><Pencil /></div>
          <div className='toolbar-item tool-eraser' onClick={handleEraserClick}><Eraser /></div>
          <div className='toolbar-item tool-palette' onClick={() => handleMenuClick('color')}><Palette /></div>
          <div className='toolbar-item tool-undo' onClick={handleUndo}><ArrowCounterclockwise /></div>
          <div className='toolbar-item tool-collapse' onClick={toggleToolbar}><ChevronLeft /></div>
        </div>

        { currentMenu && <ToolbarMenu menu={currentMenu} handleToolChange={handleToolChange} /> }
      </div>
    );
  } else {
    // Hide sidebar menu; show toggle arrow.
    content = (
      <div className='toolbar-toggle'>
        <ChevronRight className='toolbar-expand' onClick={toggleToolbar} />
      </div>
    );
  }

  return content;
}

export default Toolbar;