import React, { useMemo, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";

import FormProfile2 from "./FormProfile2";
import ProfileAvatar from "./ProfileAvatar";

// CSS
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Card } from "@mui/material";

const ProfileRender = () => {
  const { AuthState } = useContext(AuthContext);

  const initialProfileRender = useMemo(() => {
    // Affichage Profile ou Modif
    const handleProfile = () => {
      setProfileRender(
        <FormProfile2
          setProfileRender={setProfileRender}
          initialProfileRender={initialProfileRender}
        />
      );
    };

    return (
      <Container maxWidth="sm">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "1em",
              width: 600,
              maxWidth: "100%",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {AuthState.isAdmin ? (
                <Typography variant="h4" width="80%">
                  Page Administrateur
                </Typography>
              ) : (
                <Typography variant="h3">Mon Compte</Typography>
              )}
              <Box textAlign="center">
                <ProfileAvatar imageUrl={AuthState.imageUrl} />
                <Typography>Nom: {AuthState.lastName}</Typography>
                <Typography>Prénom: {AuthState.firstName}</Typography>
                <Button
                  variant="contained"
                  sx={{ m: 2 }}
                  onClick={() => handleProfile()}
                >
                  Modifier mon profile
                </Button>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </Container>
    );
  }, [
    AuthState.firstName,
    AuthState.lastName,
    AuthState.imageUrl,
    AuthState.isAdmin,
  ]);

  const [profileRender, setProfileRender] = useState(initialProfileRender);

  useEffect(() => {
    setProfileRender(initialProfileRender);
  }, [AuthState, initialProfileRender]);

  return profileRender;
};

export default ProfileRender;
