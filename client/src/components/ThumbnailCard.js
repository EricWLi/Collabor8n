import { Card, CardActionArea, CardActions, CardMedia, IconButton } from "@mui/material";
import { Trash3 } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

function ThumbnailCard({ boardId, onDelete }) {
  return (
    <Card
      key={boardId}
      sx={{
        minWidth: '200px',
        maxWidth: '384px',
        backgroundColor: 'white'
      }}
    >
      <CardActionArea
        component={Link}
        to={`/boards/${boardId}`}
      >
        <CardMedia
          component="img"
          image={`/images/thumbnail/${boardId}`}
        />
      </CardActionArea>
      <CardActions>
        <IconButton onClick={() => onDelete(boardId)}>
          <Trash3 color="black" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ThumbnailCard;