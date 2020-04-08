// Function that creates all comments HTML including initially hidden ones
export const createCommentsHTML = (comments) => {
  // Comments section html
  let commentsHTML = `
  <div class="content">
    <div class="ui content comments">
      ${comments.length > 3 ? `<div class="custom-view-previous">View previous comments</div>` : ""}
      ${createThreeCommentsHTML(comments, 3)}
    </div>
  </div>
  `;

  return commentsHTML;
};

// Function that adds an event listener for clicking show previous comments and displays given number of comments
export const showMoreComments = (numberOfComments) => {
  // On click of show previous comments button
  $(".custom-view-previous").on("click", function(e) {

    // Select all elements in that post that have a hidden comment class
    const parent = e.target.parentElement;
    const hiddenElements = parent.querySelectorAll(".custom-comment-hidden");

    // Remove hidden class for last three elements and hide show previous comments button when no more can be displayed
    hiddenElements.forEach((el, index) => {
      if (index >= hiddenElements.length - numberOfComments) {
        el.classList.remove("custom-comment-hidden");
      }

      // Hide button conditional
      hiddenElements.length <= numberOfComments ? e.target.classList.add("custom-previous-hidden") : null;
    });
  });
};

// Function the creates html for passed number of comments only
const createThreeCommentsHTML = (comments, numberOfComments) => {

  // Sort comments by date
  const sortedComments = comments.sort(function(x, y) {
    return new Date(x.timestamp) - new Date(y.timestamp);
  });

  let fourCommentsHTML = "";

  // Create html for each comment (have only last given number of comments visible)
  sortedComments.forEach((comment, index) => {
    index >= sortedComments.length - numberOfComments
      ? fourCommentsHTML += singleCommentHTML(comment)
      : fourCommentsHTML += singleCommentHTML(comment, true);
  });

  return fourCommentsHTML || "";
};

// Function that creates single comment with hidden or not as input
const singleCommentHTML = (comment, hidden) => {
  const commentHTML = `
  <div class="comment ${hidden ? "custom-comment-hidden" : ""}">
    <div class="avatar">
      <img src="${comment.avatar}">
    </div>
    <div class="content">
    <span class="custom-comment-id">${comment.id}</span>
    <span class="author">${comment.name}</span>
      <div class="metadata">
        <span class="date">${$.timeago(comment.timestamp)}</span>
      </div>
      <div class="text">
        <p>${comment.message}</p>
      </div>
    </div>
  </div>
  `;

  return commentHTML;
};

// Function that adds event listener to new comment submit
export const newComment = () => {
  $(".new-comment").on("keyup", function(e) {
    // Prevent any default
    e.preventDefault();

    // If enter is pressed
    if (e.key === "Enter") {
      const message = $(this).val();
      const resourceId = Number($(this).prev().html());
      const name = $(".custom-user").html();
      const avatar = $(".custom-user").prev().attr("src");
      const commentsContainer = $(this).parent().parent().prev().find(".comments");

      // AJAX POST request
      $.ajax({method: "POST",
        url: "/comment",
        data: {
          resourceId,
          content: message
        }
      })
        .then((resp) => {
          // New comment HTML
          const newCommentHTML = singleCommentHTML({
            id: resp.newCommentId,
            timestamp: new Date(),
            message,
            name,
            avatar,
            hidden : false
          });

          // Append new comment
          commentsContainer.append(newCommentHTML);

          // Clear input field but doesn't blur
          $(this).val("");
        });
    }
  });
};