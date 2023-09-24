import { useEffect, useRef } from "react";
import { useMachine } from "@xstate/react";
import { Container, Stack } from "react-bootstrap";
import CardComp from "./components/CardComp";
import {
  DataArrayItem,
  scrollFetchMachine,
} from "./machines/scrollFetchMachine";

function App() {
  const [state, send] = useMachine(scrollFetchMachine);

  const endOfPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        state.matches("success")
      ) {
        send("FETCH_NEXT_PAGE");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [send, state]);
  const loadingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Container fluid style={{ maxWidth: "600px", marginTop: "3rem" }}>
      {state.matches("loading") && (
        <>
          {loadingArray.map((e: number) => {
            return (
              <p className="placeholder-glow" key={e}>
                <span
                  className="placeholder col-12 bg-light"
                  style={{ height: "150px", borderRadius: "1rem" }}
                />
              </p>
            );
          })}
        </>
      )}
      {state.matches("failure") && (
        <div style={{ color: "#fff" }}>Failed to fetch page</div>
      )}
      <Stack gap={4}>
        {state.context.data.map((ns: DataArrayItem, dataIndex: number) => {
          return (
            <div key={`${ns.node.nid}_${dataIndex}`}>
              <CardComp data={ns} />
            </div>
          );
        })}
      </Stack>
      <div ref={endOfPageRef} />
    </Container>
  );
}

export default App;
