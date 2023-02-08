import { useContext } from 'react';
import { Slider } from '@mui/material';
import { ToolContext } from './Whiteboard';

function PenMenu({ handleToolChange }) {
    const tool = useContext(ToolContext);

    function handleBrushSizeChange(event, newValue) {
        handleToolChange({
            brushSize: newValue
        });
    }

    return (
        <div className="toolbar-menu-pen">
            <Slider 
                size='small' 
                value={tool.brushSize} 
                min={1} 
                max={24}
                valueLabelDisplay='auto'
                onChange={handleBrushSizeChange}
            />

        </div>
    );
}

export default PenMenu;