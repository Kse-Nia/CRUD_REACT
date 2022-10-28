import React, { useState } from "react";
import Axios from "axios";

// MAterial UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Register() {
  // Hook states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    Axios.post(
      "http://localhost:7001/home/register",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <GroupAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Créer un nouveau compte
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleRegister}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  helperText="Veillez entrer votre prénom"
                  id="demo-helper-text-misaligned"
                  label="Prénom"
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  helperText="Veillez entrer votre nom"
                  id="demo-helper-text-misaligned"
                  label="Nom"
                  autoComplete="given-name"
                  name="lastName"
                  fullWidth
                  autoFocus
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  helperText="Veillez entrer votre adresse mail"
                  id="email"
                  label="Email"
                  autoComplete="given-name"
                  name="email"
                  fullWidth
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  helperText="Veillez choisir un mot de passe"
                  id="password"
                  label="Password"
                  autoComplete="password"
                  name="password"
                  fullWidth
                  autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              onClick={handleRegister}
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Vous avez déjà un compte? Se connecter
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
