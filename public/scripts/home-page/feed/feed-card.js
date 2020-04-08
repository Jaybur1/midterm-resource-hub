import { createCommentsHTML } from "./comments.js";
import { checkIfLiked } from "./like.js";
import { checkIfRated } from "./rating.js";

// Function that creates single cards for feed
const feedCardCreator = async(resource) => {
  // Card html
  const  cardHTML = `
    <article class="ui fluid card" >
    
    <div class="content">
      <div class="right floated meta">${$.timeago(resource.created)}</div>
      <img class="ui avatar image" src="${resource.poster_avatar}"> &nbsp <span class="custom-poster-name">${resource.poster}</span>
    </div>
    <div class=" content custom-resource-area"> 
      <a class="custom-image-link" href="${resource.content}" target="_blank">
        <div class="custom-image-hover"></div>
        <img class="custom-resource-image" src="${resource.thumbnail_photo}">
      </a>
      <div class="custom-resource-name">
        <a href="${resource.content}" target="_blank">${resource.title}</a>
        <span class="custom-resource-description">${resource.description}</span>
      </div>
      <div class=" custom-rating">
      <span> <span class="custom-avg-rating ${Number(resource.avg_ratings).toFixed(1) > 0 ? "rated" : "not-rated"}"> ${Number(resource.avg_ratings).toFixed(1) > 0 ? `Avg.&nbsp ${Number(resource.avg_ratings).toFixed(1)}` : "Not rated yet"}<span/>
      &nbsp&nbsp<div class="ui yellow rating" data-rating="${await checkIfRated(resource.id) || 0}" data-max-rating="5"></div>
      <span/>
      </div>
    </div>
    <div class="content">
      <span class="custom-resource-id">${resource.id}</span>
      <span class="right floated custom-like-count">
        ${resource.likes || null}
      </span>
      <span class="right floated">
        <i class="heart ${await checkIfLiked(resource.id) ? "" : "outline"} custom-like like icon"></i>
      </span>
      <i class="comment icon"></i>
     ${resource.comments ? `${resource.comments.length} ${resource.comments.length === 1 ? `comment` : `comments` }` : null} 
    </div>
    ${resource.comments.length > 0 ? createCommentsHTML(resource.comments) : ""}
    <div class="extra content">
      <div class="ui large transparent left icon input">
        <i class="comment outline icon"></i>
        <input type="text" placeholder="Add comment...">
      </div>
    </div>
    </article>
  `;
  
  return cardHTML;
};

export default feedCardCreator;