const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteComments = document.querySelectorAll("#deleteComment");
const videoComments = document.querySelector(".video__comments ul");
const videoComment = document.getElementById("videoComment");

const addComment = (text, id, profileImage, profileName) => {
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const image = document.createElement("img");
  image.className = "avatar__video";
  image.src = `/${profileImage}`;
  const div = document.createElement("div");
  div.className = "video__comment__data";
  const span = document.createElement("span");
  span.innerText = `${profileName}`;
  span.className = "video__comment__data__name";
  const span2 = document.createElement("span");
  span2.innerText = ` ${text}`;
  span2.className = "video__comment__data__text";
  const span3 = document.createElement("span");
  span3.innerText = "❌";
  span3.className = "video__comment__data__delete";
  div.appendChild(span);
  div.appendChild(span2);
  newComment.appendChild(image);
  newComment.appendChild(div);
  newComment.appendChild(span3);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text.trim() === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId, newCommentImgSrc, newCommentUserName } =
      await response.json();
    addComment(text, newCommentId, newCommentImgSrc, newCommentUserName);
  }
};

const handleDeleteComment = async (event) => {
  const li = event.target.parentNode;
  const {
    dataset: { id: commentId },
  } = li;
  if (li) {
    videoComments.removeChild(li);
  }
  await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteComments.forEach(function (deleteComment) {
  deleteComment.addEventListener("click", handleDeleteComment);
});
