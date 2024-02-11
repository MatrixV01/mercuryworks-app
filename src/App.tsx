import { Grow, Link } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";
import { JokeButton, PunchlineButton } from "./Buttons";

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [joke, setJoke] = useState<string>("");
  const [punchline, setPunchline] = useState<string>("");
  const [showPunchlineButton, setShowPunchlineButton] =
    useState<boolean>(false);
  const [togglePunchline, setTogglePunchline] = useState<boolean>(false);
  const [toggleShow, setToggleShow] = useState<boolean>(true);
  const [imgUrl, setImgUrl] = useState<string>("");

  const getJoke = async (): Promise<void> => {
    setLoading(true);
    setTogglePunchline(false);
    setShowPunchlineButton(false);
    setToggleShow(true);
    setImgUrl(`url(./src/assets/quote-left-icon-grey.svg)`);
    try {
      const response = await fetch(
        "https://mwks-joke-service.azurewebsites.net/api/joke/random"
      );
      const data = await response.json();
      setLoading(false);
      setJoke(data.joke);
      setPunchline(data.punchLine);
      setShowPunchlineButton(true);
      console.log(data);
    } catch (error) {
      throw new Error("THERE WAS AN ERROR LOADING YOUR JOKE");
    }
  };

  useEffect(() => {
    getJoke();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          component="span"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={4}
        >
          <JokeButton getJoke={getJoke} />
          <Link
            rel="noopener"
            target="_blank"
            href="https://mwks-joke-service.azurewebsites.net/swagger/index.html"
          >
            View API Docs
          </Link>
        </Box>
        <Divider />
        <Box py={4}>
          {loading ? (
            <Typography
              align="center"
              variant="body1"
              color="initial"
              sx={{ height: "75px" }}
            >
              LOADING YOUR JOKE...
            </Typography>
          ) : (
            <Grow in={!loading} mountOnEnter unmountOnExit>
              <Typography
                variant="h5"
                color="initial"
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                sx={{
                  height: "75px",
                  minWidth: "100px",
                  backgroundImage: imgUrl,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left",
                  textAlign: "right",
                }}
              >
                {joke}
              </Typography>
            </Grow>
          )}
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            {showPunchlineButton && (
              <PunchlineButton
                togglePunchline={togglePunchline}
                toggleShow={toggleShow}
                setTogglePunchline={setTogglePunchline}
                setToggleShow={setToggleShow}
              />
            )}
          </Box>
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="right"
            alignItems="center"
          >
            {(
              <Grow in={togglePunchline} mountOnEnter unmountOnExit>
                <Typography
                  variant="h5"
                  color="initial"
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  sx={{
                    height: "75px",
                    minWidth: "100px",
                    backgroundImage: `url(${"./src/assets/quote-right-icon-grey.svg"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                  }}
                >
                  {punchline}
                </Typography>
              </Grow>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
