import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let token = readToken();

  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form
    let queryString = "";
    queryString += `title=true`;
    queryString += `&q=${searchField}`;
    setExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?${queryString}`);
  }

  const logout = () => {
    setExpanded(false);
    removeToken();
    router.push("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Duc Minh Pham</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={(e) => {
              setExpanded(!isExpanded);
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            {token ? (
              <>
                <Nav className="me-auto">
                  <Link href="/" passHref legacyBehavior>
                    <Nav.Link
                      onClick={(e) => {
                        setExpanded(false);
                      }}
                      active={router.pathname === "/"}
                    >
                      Home
                    </Nav.Link>
                  </Link>
                  <Link href="/search" passHref legacyBehavior>
                    <Nav.Link
                      onClick={(e) => {
                        setExpanded(false);
                      }}
                      active={router.pathname === "/search"}
                    >
                      Advanced Search
                    </Nav.Link>
                  </Link>
                </Nav>
                &nbsp;
                <Form className="d-flex" onSubmit={submitForm}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button variant="outline-success" type="submit">
                    Search
                  </Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title={token?.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item
                        onClick={(e) => {
                          setExpanded(false);
                        }}
                        active={router.pathname === "/favourites"}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item
                        onClick={(e) => {
                          setExpanded(false);
                        }}
                        active={router.pathname === "/history"}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/" passHref legacyBehavior>
                      <NavDropdown.Item
                        onClick={logout}
                        active={router.pathname === "/"}
                      >
                        Logout
                      </NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="me-auto">
                  <Link href="/" passHref legacyBehavior>
                    <Nav.Link
                      onClick={(e) => {
                        setExpanded(false);
                      }}
                      active={router.pathname === "/"}
                    >
                      Home
                    </Nav.Link>
                  </Link>
                </Nav>
                <Nav>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/register"}
                      onClick={(e) => setExpanded(false)}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/login"}
                      onClick={(e) => setExpanded(false)}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
