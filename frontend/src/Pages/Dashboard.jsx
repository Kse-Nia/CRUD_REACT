import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";
import Navbar from "../Components/Navbar/Navbar";
import CardPost from "../Components/Post/CardPost";

// CSS
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const { AuthState } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(() => {
    axios
      .get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `Bearer ${AuthState.token}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
      });
  }, [AuthState.token]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!posts) {
    return (
      <div>
        <Typography>Rien à afficher</Typography>
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
          {posts.map((post) => {
            return (
              <div className="postList" key={post.id}>
                <Link
                  to={{
                    pathname: `/posts/${post.id}`,
                  }}
                >
                  <CardPost {...post} />
                </Link>
              </div>
            );
          })}
        </Grid>
      </>
    );
  }
};

export default Dashboard;
