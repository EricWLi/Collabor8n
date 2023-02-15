import { useContext } from 'react';
import { Slider } from '@mui/material';
import { ToolContext } from './Whiteboard';

function PenMenu({ handleToolChange }) {
    const tool = useContext(ToolContext);

    function handleSizeChange(event, newValue) {
        handleToolChange({
            size: newValue
        });
    }

    return (
        <div className="toolbar-menu-pen">
            <Slider 
                size='small' 
                value={tool.size} 
                min={1} 
                max={24}
                valueLabelDisplay='auto'
                onChange={handleSizeChange}
            />
            <span>Thickness</span>
        </div>
    );
}

export default PenMenu;