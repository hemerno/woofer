import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
function PostCard({
  post: { body, createdAt, id, username, likesCount, commentsCount, likes },
}) {
  const userPic = `https://avatars.dicebear.com/4.5/api/identicon/${username}.svg`;

  const formattedDate = (x) => {
    const formattedDay = (y) =>
      new Date(y).toLocaleString('default', {
        day: '2-digit',
      });

    const formattedMonth = (y) =>
      new Date(y).toLocaleString('default', {
        month: '2-digit',
      });

    const formattedYear = (y) =>
      new Date(y).toLocaleString('default', {
        year: 'numeric',
      });

    return `${formattedYear(x)}-${formattedMonth(x)}-${formattedDay(x)}`;
  };

  const likePost = () => {
    console.log('Liked!');
  };
  const commentOnPost = () => {
    console.log('Commented!');
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image floated="left" size="mini" src={userPic} />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {formattedDate(createdAt)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui">
          <Button onClick={likePost} basic icon="heart" content={likesCount} />
          <Button
            onClick={commentOnPost}
            basic
            icon="comments"
            content={commentsCount}
          />
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
