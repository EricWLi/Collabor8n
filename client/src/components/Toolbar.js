import { useState } from 'react';
import { Pencil, Eraser, DashLg, Square, Palette, ArrowCounterclockwise, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import ToolbarMenu from './ToolbarMenu';

function Toolbar({ handleToolChange, handleUndo }) {
  const [open, setOpen] = useState(true);
  const [currentMenu, setCurrentMenu] = useState(null);

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

  let content;

  if (open) {
    // Show sidebar menu.
    content = (
      <div className='toolbar-container'>
        <div className='toolbar'>
          <div className='toolbar-item tool-pencil' onClick={() => handleMenuClick('pen')}><Pencil /></div>
          <div className='toolbar-item tool-eraser' onClick={handleToolChange}><Eraser /></div>
          {/* <div className='toolbar-item tool-line' onClick={() => handleToolChange('line')}><DashLg /></div> */}
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