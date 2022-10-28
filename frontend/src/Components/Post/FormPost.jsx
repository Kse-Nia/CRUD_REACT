import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

//  CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";
import { AuthContext } from "../../App";

const FormPost = (props) => {
  const { AuthState } = useContext(AuthContext);
  const UserId = AuthState.userId;
  const firstName = AuthState.firstName;
  const lastName = AuthState.lastName;

  console.log("UserId", UserId);
  console.log("firstName", firstName);
  console.log("lastName", lastName);

  const [selectedFile, setSelectedFile] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const [placeHolderText, setPlaceHolderText] = useState("");
  useEffect(() => {
    setPlaceHolderText(`Ecrire quelques mots..`);
  }, [AuthState]);

  function handleFormSubmit(values) {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("UserId", UserId);
    if (values.content) formData.append("content", values.content);
    // Partie ajout image
    if (
      selectedFile &&
      ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
        selectedFile.type
      )
    ) {
      formData.append("imageUrl", selectedFile);
    } else if (selectedFile) {
      setErrorMessage("Format de fichier non pris en charge");
      return;
    } else {
    }

    axios({
      method: "post",
      url: "http://localhost:8080/api/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AuthState.token}`,
      },
    })
      .then(() => {
        setErrorMessage(null);
        setSelectedFile();
        //setMedia("default");
        toast.success("Posté !", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Posté");
      })
      .catch((error) => {
        if (typeof error.response.data === "string") {
          setErrorMessage(error.response.data);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }

  return (
    <Container>
      <Card
        sx={{
          mt: 2,
        }}
      >
        <Box
          sx={{
            mx: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Créer un nouveau post</Typography>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Formik
            initialValues={{ content: "" }}
            onSubmit={(values) => {
              if (!values.content === "" || !selectedFile) {
                setErrorMessage("Veuillez remplir les champs");
                return;
              }
              handleFormSubmit(values);
            }}
          >
            <Form>
              <div>
                <Field
                  name="content"
                  type="contentarea"
                  placeholder={placeHolderText}
                  style={{ height: 80, width: 300 }}
                />
                <ErrorMessage name="text" className="errorInput" />
              </div>

              <div>
                <Field
                  name="imageUrl"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif"
                />
                <ErrorMessage name="picture" className="errorInput" />
              </div>
              <Button
                variant="contained"
                type="submit"
                title="Poster"
                aria-label="Poster"
              >
                Poster
              </Button>
            </Form>
          </Formik>
        </Box>
      </Card>
    </Container>
  );
};

export default FormPost;
