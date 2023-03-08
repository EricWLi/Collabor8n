import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Trash3 } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

function ThumbnailCard({ board, onDelete }) {
  const { user } = useAuthContext();

  const isOwner = board.owner._id === user.userId;

  return (
    <Card
      sx={{
        minWidth: '200px',
        maxWidth: '384px',
        backgroundColor: 'white'
      }}
    >
      <CardActionArea
        component={Link}
        to={`/boards/${board._id}`}
      >
        <CardMedia
          component="img"
          image={`/images/thumbnail/${board._id}`}
        />
        <CardContent sx={{ color: 'black' }}>
          <Typography>Owner: {board.owner.firstName} {board.owner.lastName} ({board.owner.username})</Typography>
          <Typography>Created: {new Date(board.createdAt).toLocaleString()}</Typography>
          <Typography>Updated: {new Date(board.updatedAt).toLocaleString()}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton 
          onClick={() => onDelete(board._id)} 
          disabled={!isOwner}
        >
          <Trash3 color={isOwner ? 'black' : 'grey'} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ThumbnailCard;