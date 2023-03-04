import ColorMenu from "./ColorMenu";
import PenMenu from "./PenMenu";

function ToolSelectorMenu({ menu, handleToolChange }) {
  let content;

  switch (menu) {
    case "pen":
      content = <PenMenu handleToolChange={handleToolChange} />;
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

export default ToolSelectorMenu;