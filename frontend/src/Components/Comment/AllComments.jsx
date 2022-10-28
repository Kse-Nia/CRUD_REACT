import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../App";

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

const AllComments = (props) => {
  const { AuthState } = useContext(AuthContext);
  const [comments, getComments] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/comments/" + props.id, {
        headers: {
          Authorization: `Bearer ${AuthState.token}`,
        },
      })
      .then((response) => {
        getComments(response.data);
      });
  }, [AuthState.token, id]);

  if (!comments) {
    return (
      <div>
        <Typography>Aucun commentaire</Typography>
      </div>
    );
  } else {
    return (
      <div>
        <Typography>Tous les commentaires</Typography>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Typography> {comment.firstName} </Typography>
            <Typography>{comment.text}</Typography>
          </div>
        ))}
      </div>
    );
  }
};

export default AllComments;
