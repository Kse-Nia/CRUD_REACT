import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../App";

const CommentModal = (props) => {
  const { AuthState } = useContext(AuthContext);
  const [comment, setComment] = useState({});

  const visibleClass = props.open ? "block" : "hidden";

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/comments" + props.id)
      .then((response) => {
        setComment(response.data);
      });
  }, [props.id]);

  function close() {
    setComment({});
    props.onClickOut();
  }

  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass
      }
      style={{ backgroundColor: "rgba(0,0,0,.8)" }}
    >
      <div>
        <ClickOutHandler onClickOut={() => close()}>
          <div>
            <div className="">
              <Comment comment={comment} id={props.id} />
            </div>
          </div>
        </ClickOutHandler>
      </div>
    </div>
  );
};

export default CommentModal;
