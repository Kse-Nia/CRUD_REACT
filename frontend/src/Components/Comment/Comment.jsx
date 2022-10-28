import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../App";

const Comment = (props) => {
  const { AuthState } = useContext(AuthContext);
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState([]);
  const [commentsTotals, setCommentsTotals] = useState(null);

  function refreshComments() {
    axios
      .get("http://localhost:8080/api/comments" + props.id)
      .then((response) => {
        setComments(response.data);
      });
  }

  useEffect(() => {
    if (props.comment) {
      setComment(props.comment);
    } else {
      axios
        .get("http://localhost:8080/api/comments/" + props.id)
        .then((response) => {
          setComment(response.data);
        });
    }
    refreshComments();
  }, [props.id, props.comment]);

  return (
    <>
      {comment && <Post {...comment} open={true} />}
      {!!comment && !!comment._id && (
        <>
          <hr className="border-reddit_border my-4" />
          <CommentForm
            onSubmit={() => refreshComments()}
            rootId={comment._id}
            parentId={comment._id}
            showAuthor={true}
          />
          <hr className="border-reddit_border my-4" />

          <Comments
            parentId={comment._id}
            rootId={comment._id}
            comments={comments}
          />
        </>
      )}
    </>
  );
};

export default Comment;
