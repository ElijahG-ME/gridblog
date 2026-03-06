/*
TODO (Header.jsx):
Create the entire Header component.

Requirements:
- Show the site title and a one-sentence description.
- Show summary numbers: totalPosts, totalLikes, totalDislikes.
*/

export default function Header({ totalPosts, totalLikes, totalDislikes }) {
  // TODO: Replace return null with your JSX
  return (
  <div>
    <h1 className="header">GridBlog</h1>
    <div className="headerStats">
        <div>Total Posts: {totalPosts}</div>
        <div>Total Likes: {totalLikes}</div>
        Total Dislikes: {totalDislikes}    
    </div>
  </div>
  );
}
