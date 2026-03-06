function excerpt(text, max = 140) {
  // Shorten long content so cards stay compact
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export default function PostCard({ post, onLike, onDislike }) {
  const { id, title, author, createdAt, content, imageDataUrl, likes, dislikes } = post;

  return (
    <article className="card">
      {imageDataUrl ? <img src={imageDataUrl} alt={title} /> : null}

      <div>
        <h3 className="cardTitle">{title}</h3>
        <div className="meta">
          <span>By {author}</span>
          <span>•</span>
          <span>{createdAt}</span>
        </div>
      </div>

      <p className="cardBody">{excerpt(content)}</p>

      {/* TODO (PostCard.jsx):
          Add a like dislike action buttons block like this (like is compelte:

      */
        <div className="actions">
            <button type="button" onClick={() => onLike(id)}>
              👍 Like <span className="count">{likes}</span>
            </button>
            <button type="button" onClick={() => onDislike(id)}>
              👎 Dislike <span className="count">{dislikes}</span>
            </button>
        </div>
      
      }
    </article>
  );
}

