import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
} from "@mui/material";

const AddPoints: React.FC = () => {
  const [form, setForm] = React.useState({
    og: "",
    points: 0,
    remarks: "",
  });

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOG = (e: SelectChangeEvent<string>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClearAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm({
      og: "",
      points: 0,
      remarks: "",
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
        height: "70vh",
        width: ["90%", "60%", "35%"],
        alignSelf: "center",
        backgroundColor: "translucent",
        border: "1px solid white",
      }}
      onSubmit={handleSubmit}
    >
      <InputLabel
        id="og-label"
        sx={{
          color: "white",
          fontFamily: "-moz-initial",
          fontSize: "1.5rem",
          paddingBottom: "1rem",
        }}
      >
        Orientation Group
      </InputLabel>
      <Select
        labelId="og-label"
        id="og-select"
        name="og"
        value={form.og}
        onChange={handleChangeOG}
        label="og"
        sx={{
          backgroundColor: "white",
          width: ["60%", "60%", "50%"],
          height: "8%",
        }}
      >
        <MenuItem value="Aphrodite">Aphrodite</MenuItem>
        <MenuItem value="Apollo">Apollo</MenuItem>
        <MenuItem value="Ares">Ares</MenuItem>
        <MenuItem value="Artemis">Artemis</MenuItem>
        <MenuItem value="Athena">Athena</MenuItem>
        <MenuItem value="Demeter">Demeter</MenuItem>
        <MenuItem value="Dionysus">Dionysus</MenuItem>
        <MenuItem value="Hephaestus">Hephaestus</MenuItem>
        <MenuItem value="Hera">Hera</MenuItem>
        <MenuItem value="Hermes">Hermes</MenuItem>
        <MenuItem value="Poseidon">Poseidon</MenuItem>
        <MenuItem value="Zeus">Zeus</MenuItem>
      </Select>

      <InputLabel
        id="points-label"
        sx={{
          color: "white",
          fontFamily: "-moz-initial",
          fontSize: "1.5rem",
          paddingBottom: "1rem",
          paddingTop: "2rem",
        }}
      >
        Points
      </InputLabel>
      <TextField
        name="points"
        type="number"
        value={form.points}
        onChange={handleChangeText}
        inputProps={{
          step: "10",
          min: "0",
          style: { textAlign: "center" },
        }}
        sx={{
          backgroundColor: "white",
          width: ["60%", "60%", "50%"],
          height: "8%",
        }}
      />

      <InputLabel
        id="remark-label"
        sx={{
          color: "white",
          fontFamily: "-moz-initial",
          fontSize: "1.5rem",
          paddingBottom: "1rem",
          paddingTop: "2rem",
        }}
      >
        Remarks
      </InputLabel>
      <TextField
        name="remarks"
        value={form.remarks}
        onChange={handleChangeText}
        sx={{
          backgroundColor: "white",
          width: ["60%", "60%", "50%"],
          height: "8%",
        }}
      />

      <Button
        type="submit"
        sx={{
          "&:hover": {
            color: "white",
            background: "#484747",
          },
          backgroundColor: "white",
          width: ["60%", "60%", "50%"],
          height: "8%",
          marginTop: "5rem",
          marginBottom: "1rem",
          color: "black",
        }}
      >
        Submit
      </Button>

      <Button
        onClick={handleClearAll}
        sx={{
          "&:hover": {
            color: "white",
            background: "#484747",
          },
          backgroundColor: "white",
          width: ["60%", "60%", "50%"],
          height: "8%",
          marginBottom: "5vh",
          color: "black",
        }}
      >
        Clear All
      </Button>
    </Box>
  );
};

export default AddPoints;
