import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import { useParams } from "react-router-dom";
import "moment-timezone";

import Navbar from "../Components/Navbar/Navbar";
import CardPost from "../Components/Post/CardPost";

//import FormCom from "../Components/Comment/FormCom";
import FormCom2 from "../Components/Comment/FormCom2";
import AllComments from "../Components/Comment/AllComments";

// CSS
import withReactContent from "sweetalert2-react-content";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const OnePost = () => {
  const { AuthState } = useContext(AuthContext);
  const [post, getPost] = useState([]);
  let { id } = useParams();

  const getOnePost = useCallback(() => {
    axios
      .get(`http://localhost:8080/api/${id}`, {
        headers: {
          Authorization: `Bearer ${AuthState.token}`,
        },
      })
      .then((response) => {
        getPost(response.data);
        console.log(response.data);
      });
  }, [AuthState.token, id]);

  useEffect(() => {
    getOnePost();
  }, [getOnePost]);

  if (!post) {
    return (
      <div>
        <Typography>Post introuvable..</Typography>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <Grid
          container
          spacing={5}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <CardPost {...post} />
          <FormCom2 {...post} />
          <AllComments {...post} />
        </Grid>
      </>
    );
  }
};

export default OnePost;
