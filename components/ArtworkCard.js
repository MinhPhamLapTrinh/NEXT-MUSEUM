import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={400} />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={
            data?.primaryImageSmall ||
            `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`
          }
        />
        <Card.Body>
          <Card.Title>{data?.title || "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data?.objectDate || "N/A"} <br />
            <strong>Classification: </strong>
            {data?.classification || "N/A"}
            <br />
            <strong>Medium: </strong>
            {data?.medium || "N/A"}
            <br />
          </Card.Text>
          <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
            <Button variant="primary"> ID: {data?.objectID || "N/A"}</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
