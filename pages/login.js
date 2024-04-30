import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import RingLoader from "react-spinners/RingLoader";
export default function Login(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isLoading, setIsLoading] = useState(false);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <RingLoader
              color="#ccddd9"
              size={200}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : (
        <>
          <Card bg="light">
            <Card.Body>
              <h2>Login</h2>
              Enter your login information below:
            </Card.Body>
          </Card>

          <br />

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>User:</Form.Label>
              <Form.Control
                type="text"
                value={user}
                id="userName"
                name="userName"
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {warning && (
              <>
                <br />
                <Alert variant="danger">{warning}</Alert>
              </>
            )}

            <br />
            <Button variant="primary" className="pull-right" type="submit">
              Login
            </Button>
          </Form>
        </>
      )}
    </>
  );
}
