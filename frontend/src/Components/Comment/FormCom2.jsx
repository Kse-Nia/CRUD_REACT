import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

//  CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, TextField } from "@mui/material";
import { AuthContext } from "../../App";

// Schema Validation Comment
const CommentSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, "Texte trop court, veillez écrire plus de 3 caractères")
    .max(600, "Veillez ne pas dépasser 600 caractères")
    .required("Texte obligatoire"),
});

const FormCom2 = ({ post }) => {
  const { AuthState } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  const UserId = AuthState.userId;
  const firstName = AuthState.firstName;
  const lastName = AuthState.lastName;
  const PostId = params.id;
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  console.log("UserId", UserId);
  console.log("PostId", PostId);
  console.log("firstName", firstName);
  console.log("lastName", lastName);

  const handleComment = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/api/comment/${post.id}`,
      data: {
        PostId: PostId,
        UserId: UserId,
        firstName: firstName,
        lastName: lastName,
        text: text,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AuthState.token}`,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Posté !", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/post/" + PostId);
        }
        console.log("Commentaire posté");
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
    <Container>
      <Box
        m={2}
        pt={3}
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card sx={{ width: "90%", margin: "0", padding: "0" }}>
          <Typography align="center" variant="h4">
            Ecrire un commentaire
          </Typography>
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
          <Box
            component="form"
            onSubmit={handleComment}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="text"
              label="Votre commentaire"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Poster le commentaire
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default FormCom2;
