import Button from "@mui/material/Button";

export const JokeButton = ({ getJoke = () => {} }) => {
  return (
    <Button
      variant="contained"
      color="success"
      size="large"
      sx={{ borderRadius: 10, textTransform: "capitalize", height: 60 }}
      onClick={getJoke}
    >
      Get a new random joke
    </Button>
  );
};

export const PunchlineButton = ({
  togglePunchline,
  toggleShow,
  setTogglePunchline,
  setToggleShow,
}: {
  togglePunchline: boolean;
  toggleShow: boolean;
  setTogglePunchline: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Button
      size="large"
      variant="contained"
      onClick={() => {
        setTogglePunchline(!togglePunchline);
        setToggleShow(!toggleShow);
      }}
      sx={{
        borderRadius: 10,
        textTransform: "capitalize",
        height: 60,
      }}
    >
      {toggleShow ? "Show" : "Hide"} punchline
    </Button>
  );
};
