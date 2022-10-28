import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../App";

// CSS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";

const Password = (props) => {
  const { AuthState } = useContext(AuthContext); // Auth
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (values, resetForm) => {
    axios({
      method: "put",
      url: "http://localhost:8080/home/password",
      headers: { Authorization: `Bearer ${AuthState.token}` },
      data: values,
    })
      .then(() => {
        setErrorMessage(null);
        props.setProfileRender(props.initialProfileRender);
        resetForm();
        console.log("ok");
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Card sx={{ p: 1 }}>
            <Typography variant="h3" align="center">
              Modifier le mot de passe
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    name="oldPassword"
                    type="password"
                    placeholder="Ancien mot de passe"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    margin="normal"
                    name="password"
                    type="password"
                    placeholder="Nouveau mot de passe"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="normal"
                    name="controlPassword"
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    onChange={(e) => setControlPassword(e.target.value)}
                    value={controlPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                aria-label="Modifier mot de passe"
                sx={{ mt: 3, mb: 2 }}
              >
                Valider
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  props.setProfileRender(props.initialProfileRender);
                }}
              >
                Annuler
              </Button>
            </Box>
          </Card>
        </Grid>
      </Box>
    </Container>
  );
};

export default Password;
