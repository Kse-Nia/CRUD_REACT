import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AuthContext } from "../../App";
import Password from "./Password";

// CSS
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const FormProfile2 = (props) => {
  const { AuthState, dispatchAuthState } = useContext(AuthContext);
  const MySwal = withReactContent(Swal);
  const [selectedFile, setSelectedFile] = useState();

  const handleFormSubmit = (values, resetForm) => {
    if (!values.firstName || !values.lastName)
      return console.log("Veuillez remplir au moins une donnée");

    const formData = new FormData();
    for (let i in values) {
      if (!values[i]) {
      } else if (i === "email") formData.append(i, values[i].toLowerCase());
      else
        formData.append(
          i,
          values[i].charAt(0).toUpperCase() + values[i].slice(1).toLowerCase()
        );
    }

    if (
      selectedFile &&
      ["image/jpg", "image/jpeg", "image/png"].includes(selectedFile.type)
    ) {
      formData.append("imageUrl", selectedFile);
    } else if (selectedFile) {
      console.log("File Error");
      return;
    } else {
    }

    axios({
      method: "put",
      url: "http://localhost:8080/home/update",
      data: formData,
      headers: {
        Authorization: `Bearer ${AuthState.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatchAuthState({
            type: "Login",
            payload: res.data,
          });
          resetForm();
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.error(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const handleDeleteAccount = () => {
    axios({
      method: "delete",
      url: "http://localhost:8080/home/",
      headers: {
        Authorization: `Bearer ${AuthState.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatchAuthState({
            type: "LogOut",
          });
          console.log("Votre compte a été supprimé");
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <Container maxWidth="sm" component="main">
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
          <Typography variant="h5">Mettre à jour mes données</Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              imageUrl: "",
            }}
            onSubmit={(values, { resetForm }) => {
              if (!values.firstName && !values.lastName && !selectedFile)
                return console.log("Veuillez remplir les données");

              // show new informations and ask confirmation
              let newFirstName = "";
              let newLastName = "";
              let newFile = "";
              if (values.firstName)
                newFirstName = `Prénom : ${values.firstName}`;
              if (values.lastName) newLastName = `Nom : ${values.lastName}`;
              if (selectedFile) newFile = `Avatar : ${selectedFile.name}`;

              MySwal.fire({
                title: "Valider les modifications ?",
                showCancelButton: true,
                confirmButtonText: "Valider",
                cancelButtonText: "Annuler",
                buttonsStyling: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  handleFormSubmit(values);
                } else return;
              });
            }}
          >
            <Form>
              <Grid sx={{ mt: 1, mb: 1 }}>
                <Field
                  name="firstName"
                  type="text"
                  placeholder={`Prénom actuel : ${AuthState.firstName}`}
                />
                <Field
                  name="lastName"
                  type="text"
                  placeholder={`Nom actuel : ${AuthState.lastName}`}
                />
              </Grid>
              <Field
                name="imageUrl"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                type="file"
                accept=".jpg, .jpeg, .png,"
                className="file-input"
              />
              <Box textAlign="center" sx={{ mt: 3, mb: 2 }}>
                <Button variant="contained" type="submit" title="Modifier">
                  Modifier
                </Button>
                <Button
                  onClick={() => {
                    props.setProfileRender(props.initialProfileRender);
                  }}
                >
                  Annuler
                </Button>
              </Box>
              <Box textAlign="center">
                <Button
                  sx={{ mt: 3, mb: 2 }}
                  variant="contained"
                  onClick={() =>
                    props.setProfileRender(
                      <Password
                        setProfileRender={props.setProfileRender}
                        initialProfileRender={props.initialProfileRender}
                      />
                    )
                  }
                >
                  Changer mot de passe
                </Button>
              </Box>
            </Form>
          </Formik>
          <button
            onClick={() => {
              MySwal.fire({
                icon: "warning",
                title: "Supprimer définitivement le compte ?",
                showCancelButton: true,
                confirmButtonText: "Supprimer",
                cancelButtonText: "Annuler",
                buttonsStyling: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteAccount();
                } else return;
              });
            }}
          >
            Supprimer le compte
          </button>
        </Card>
      </Grid>
    </Container>
  );
};

export default FormProfile2;
