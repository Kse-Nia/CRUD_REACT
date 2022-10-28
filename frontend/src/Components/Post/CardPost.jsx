/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment"; // Date format
import "moment-timezone";

//import FormCom from "../Comment/FormCom";
import AllComments from "../Comment/AllComments";
import FormCom2 from "../Comment/FormCom2";

// CSS
import TextsmsIcon from "@mui/icons-material/Textsms";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Card } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container } from "@mui/system";

const CardPost = (props) => {
  const { AuthState } = useContext(AuthContext);
  const reactSwal = withReactContent(Swal);
  const navigate = useNavigate();

  const deletePost = () => {
    axios
      .delete(`http://localhost:8080/api/${props.id}`, {
        headers: {
          Authorization: `Bearer ${AuthState.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        reactSwal.fire({
          title: "Post supprimé",
          icon: "success",
          timer: 2000,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box
        m={2}
        pt={3}
        display="flex"
        direction="column"
        justifyContent="center"
      >
        <Card sx={{ maxWidth: "80%", margin: "0", padding: "0" }}>
          <div>
            <header className="cardheader">
              <Stack
                sx={{ alignItems: "center" }}
                direction="row"
                spacing={1}
                className="userInfo"
              >
                {props.UserId === AuthState.UserId ||
                AuthState.isAdmin === true ? (
                  <Button
                    size="small"
                    type="button"
                    onClick={() => {
                      reactSwal
                        .fire({
                          title: "Valider la suppression du post ?",
                          showConfirmButton: true,
                          showCancelButton: true,
                          confirmButtonAriaLabel: "Supprimer le post",
                          cancelButtonAriaLabel:
                            "Annuler la suppression du post",
                          confirmButtonText: "Valider",
                          cancelButtonText: "Annuler",
                          buttonsStyling: false,
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            deletePost();
                          } else return;
                        });
                    }}
                    title="supprimer le post"
                    aria-label="Supprimer le post"
                  >
                    <DeleteForeverRoundedIcon
                      sx={{ color: pink[500] }}
                      fontSize="small"
                    />
                  </Button>
                ) : null}
                <Typography
                  label={'margin="normal"'}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {props.firstName}
                </Typography>
                <Typography
                  label={'margin="normal"'}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {props.lastName}
                </Typography>
                <Box justifyContent="flex-end">
                  <Typography
                    label={'margin="normal"'}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    //gutterBottom
                    align="right"
                  >
                    Posté le:
                    <Moment format="DD/MM/YYYY">{props.createdAt}</Moment>
                  </Typography>
                </Box>
              </Stack>
              {/*  <div className="user-avatar">
              <img
                src={props.User.imageUrl}
                alt="profil avatar"
                crossOrigin="anonymous"
                className="avatar"
              />
            </div> */}
            </header>
            <img
              src={props.imageUrl}
              crossOrigin="anonymous"
              alt="card-pic"
              className="post_picture"
            />
            <Box
              sx={{
                textAlign: "center",
                m: 1,
                fontWeight: "medium",
                fontSize: 18,
              }}
            >
              <Typography label={'margin="normal"'}>{props.content}</Typography>
            </Box>
          </div>
        </Card>
      </Box>
    </>
  );
};

export default CardPost;
