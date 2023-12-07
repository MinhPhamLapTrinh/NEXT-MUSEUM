import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";
export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  return (
    <>
      {parsedHistory?.length > 0 ? (
        <>
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                onClick={(e) => historyClicked(e, index)}
                className={styles.historyListItem}
              >
                {Object.keys(historyItem).map((key) => (
                  <>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            <p>Try searching for some artwork</p>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
