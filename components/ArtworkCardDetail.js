import useSWR from "swr";
import Error from "next/error";
import Card from "react-bootstrap/Card";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
export default function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  if (!favouritesList) return null;

  if (!data) {
    return null;
  }

  if (error) {
    return <Error statusCode={400} />;
  }

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  }

  return (
    <>
      <Card style={{ width: "80rem" }}>
        {data?.primaryImage ? (
          <Card.Img variant="top" src={data.primaryImage} />
        ) : null}
        <Card.Body>
          <Card.Title>{data?.title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data?.objectDate || "N/A"}
            <br />
            <strong>Classification: </strong>
            {data?.classification || "N/A"} <br />
            <strong>Medium: </strong>
            {data?.medium || "N/A"}
            <br />
            <br />
            {data?.artistDisplayName ? (
              <>
                <strong>Artist: </strong>
                {data.artistDisplayName}(
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  wiki
                </a>
                )
              </>
            ) : (
              <strong>Artist: N/A</strong>
            )}
            <br />
            <strong>Credit Line: </strong>
            {data?.creditLine || "N/A"}
            <br />
            <strong>Dimensions: </strong>
            {data?.dimensions || "N/A"}
            <br />
            <br />
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              + Favourite {showAdded ? "(added)" : ""}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
