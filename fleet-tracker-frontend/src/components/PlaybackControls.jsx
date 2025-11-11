import { styled } from "@mui/material/styles";
import {
  Button,
  Typography,
  Select,
  MenuItem,
  Slider,
  Box,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const ControlBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(25, 25, 25, 0.8)",
  borderRadius: "12px",
  padding: "10px 20px",
  marginTop: theme.spacing(3),
  boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
  color: "#fff",
  gap: "1rem",
  marginBottom: "2rem"
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: "48px",
  height: "40px",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #2196f3, #1976d2)",
  color: "#fff",
  boxShadow: "0 0 10px rgba(33, 150, 243, 0.3)",
  "&:hover": {
    background: "linear-gradient(90deg, #42a5f5, #1e88e5)",
    boxShadow: "0 0 12px rgba(33, 150, 243, 0.6)",
  },
}));

const StyledSelect = styled(Select)(() => ({
  color: "#fff",
  background: "rgba(255,255,255,0.1)",
  borderRadius: "6px",
  "& .MuiSelect-icon": { color: "#fff" },
  "& fieldset": { border: "none" },
}));

const StyledSlider = styled(Slider)(() => ({
  width: 150,
  color: "#2196f3",
  "& .MuiSlider-thumb": {
    backgroundColor: "#fff",
    boxShadow: "0 0 8px rgba(33,150,243,0.5)",
  },
  "& .MuiSlider-track": {
    backgroundColor: "#2196f3",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
}));

export default function PlaybackControls({
  isRunning,
  setIsRunning,
  speed,
  setSpeed,
}) {
  const handleSliderChange = (e, value) => {
    const newSpeed = Math.round(value / 10) || 1;
    setSpeed(newSpeed);
  };

  return (
    <ControlBar>
      <StyledButton onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
      </StyledButton>

      <Typography sx={{ fontSize: "0.9rem" }}>Speed</Typography>

      <StyledSelect
        value={speed}
        size="small"
        onChange={(e) => setSpeed(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
          <MenuItem key={s} value={s}>
            {s}x
          </MenuItem>
        ))}
      </StyledSelect>

      <StyledSlider
        value={speed * 10}
        min={10}
        max={100}
        step={10}
        onChange={handleSliderChange}
      />

      <Typography sx={{ fontSize: "0.9rem" }}>{speed}x</Typography>
    </ControlBar>
  );
}
