import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const StyledProgress = styled("progress")(({ theme, color }) => ({
  width: "100%",
  height: "8px",
  borderRadius: "5px",
  overflow: "hidden",

  "&::-webkit-progress-bar": {
    borderRadius: "5px",
  },

  "&::-webkit-progress-value": {
    backgroundColor: color,
    borderRadius: "5px",
  },

  "&::-moz-progress-bar": {
    backgroundColor: color,
    borderRadius: "5px",
  },
}));

const ProgressBar = ({ value = 0, max = 100, color = "red" }) => {
  return (
    <Grid>
      <StyledProgress value={value} max={max} color={color} />
    </Grid>
  );
};

export default ProgressBar;
