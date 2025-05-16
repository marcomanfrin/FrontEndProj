import { Link } from "react-router"
import { Container, Button} from "react-bootstrap";

import VisitatoButton from "./visitedBtn";
import '../../style/ComponentLayout.css'

function Bivacco({ id, title, image, selectedBivacco, handleSelect }) {

  const isSelected = id === (selectedBivacco && selectedBivacco.id)

  return (
    <div className={`bivacco ${isSelected ? "selected" : ""}`} onClick={() => handleSelect({ id })}>
      <Container className="component-container mt-4">
        <img src={image} alt={title} className="img-fluid bivacco-image" />
        <h2>{title}</h2>
        <VisitatoButton bivaccoId={id} />
        <Button as={Link} to={`/Bivacchi/${id}`}>Dettagli bivacco</Button>
      </Container>
    </div>
  )
}

export default Bivacco
