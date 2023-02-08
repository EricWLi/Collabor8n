import ColorMenu from "./ColorMenu";
import PenMenu from "./PenMenu";
import ShapeMenu from "./ShapeMenu";

function ToolbarMenu({ menu, handleToolChange }) {
    let content;
    
    switch (menu) {
        case "pen":
            content = <PenMenu handleToolChange={handleToolChange} />;
            break;
            
        case "shape":
            content = <ShapeMenu handleToolChange={handleToolChange} />;
            break;

        case "color":
            content = <ColorMenu handleToolChange={handleToolChange} />;
            break;

        default:
            return;
    }

    return (
        <div className="toolbar-menu">
            {content}
        </div>
    );
}

export default ToolbarMenu;