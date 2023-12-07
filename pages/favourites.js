import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Card from "react-bootstrap/Card";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  return (
    <>
      <Row className="gy-4">
        {favouritesList?.length > 0 ? (
          <>
            {favouritesList.map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))}
          </>
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              <p>Try searching for some artwork</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}
