import { Card } from 'react-bootstrap';
import '../style/ComponentLayout.css'

const UserCard = ({ user }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Img
          variant="top"
          src={user.img || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740"}
          className="profile-img"
        />
        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
