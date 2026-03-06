import React from "react";
import Header from "./components/Header.jsx";
import NewPostForm from "./components/NewPostForm.jsx";
import PostGrid from "./components/PostGrid.jsx";

function makeId() {
  // Generates unique IDs for posts.
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "p_" + Math.random().toString(16).slice(2);
}

function todayString() {
  return new Date().toLocaleDateString();
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO (App.jsx):
      // Add some initial posts object so the page starts with content.
      // Use the post format described in the assignment.
      posts: [
        {
        id: "100X1",
        title: "Soup Recipe",
        author: "Soup Sovereign",
        content: "This soup has been improved from the last recipe, with a much lower LD50",
        createdAt: "06/06/2025",
        imageDataUrl: "",      // optional Data URL created by FileReader
        likes: 0,
        dislikes: 999
      },

      {
        id: "100X2",
        title: "Empty post",
        author: "Nobody",
        content: "This post is empty",
        createdAt: "11/07/2025",
        imageDataUrl: "",      // optional Data URL created by FileReader
        likes: 0,
        dislikes: 0
      },

      {
        id: "300X9",
        title: "How to make a react website",
        author: "ReactMaster",
        content: "All things should be react. My OS is in react. My compiler is in react. My wife is in react.",
        createdAt: "01/01/2026",
        imageDataUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png",      // optional Data URL created by FileReader
        likes: 1800,
        dislikes: 0
      }
     
  ],
      form: {
        title: "",
        author: "",
        content: "",
        imageDataUrl: "",
      },
      error: "",
    };
  }

  // Controlled inputs: when user types, update this.state.form
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      form: { ...prev.form, [name]: value },
      error: "",
    }));
  };

  // Read an uploaded image and store it as a Data URL so we can preview it.
  handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      this.setState((prev) => ({
        form: { ...prev.form, imageDataUrl: "" },
        error: "",
      }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      this.setState({ error: "Please select a valid image file (PNG/JPG/GIF/etc.)." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.setState((prev) => ({
        form: { ...prev.form, imageDataUrl: String(reader.result || "") },
        error: "",
      }));
    };
    reader.onerror = () => {
      this.setState({ error: "Could not read the image file. Try another image." });
    };
    reader.readAsDataURL(file);
  };

  validateForm = () => {
    const { title, author, content } = this.state.form;
    if (!title.trim()) return "Title is required.";
    if (!author.trim()) return "Author is required.";
    if (!content.trim()) return "Content is required.";
    if (content.trim().length < 30) return "Content must be at least 30 characters.";
    return "";
  };

  addPost = (e) => {
    e.preventDefault();

    const msg = this.validateForm();
    if (msg) {
      this.setState({ error: msg });
      return;
    }

    const { title, author, content, imageDataUrl } = this.state.form;

    const newPost = {
      id: makeId(),
      title: title.trim(),
      author: author.trim(),
      content: content.trim(),
      createdAt: todayString(),
      imageDataUrl: imageDataUrl || "",
      likes: 0,
      dislikes: 0,
    };

    // Add to top of list (newest first)
    this.setState((prev) => ({
      posts: [newPost, ...prev.posts],
      form: { title: "", author: "", content: "", imageDataUrl: "" },
      error: "",
    }));

    // Clear file input field (simple DOM approach for this lab)
    const input = document.getElementById("imageInput");
    if (input) input.value = "";
  };

  likePost = (id) => {
    // Increase likes for ONE matching post (immutable update)
    this.setState((prev) => ({
      posts: prev.posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)),
    }));
  };

  // TODO (App.jsx):
  // Add dislikePost = (id) => { ... } using the same pattern as likePost.
  // It should increase dislikes by 1 for only the matching post.

  dislikePost = (id) => {
    // Decrease likes for ONE matching post (immutable update)
    this.setState((prev) => ({
      posts: prev.posts.map((p) => (p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p)),
    }));
  };

  render() {
    const { posts, form, error } = this.state;

    // Totals for the header
    const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
    const totalDislikes = posts.reduce((sum, p) => sum + p.dislikes, 0);

    return (
      <div className="page">
        {<Header totalPosts={posts.length} totalLikes= {posts.likes} totalDislikes={posts.dislikes} />}

        <div className="layout">
          <aside className="panel" id="about">
            <h2 className="panelTitle">About</h2>
            <p className="muted">
              GridBlog is a front-end React demo using <strong>class-based state</strong>,
              <strong> props</strong>, and <strong>CSS Grid</strong>.
            </p>
            <ul className="muted">
              <li>Add posts instantly (stored in memory)</li>
              <li>Upload an image (preview stored as Data URL)</li>
              <li>Like/Dislike updates a single post only</li>
            </ul>

            <div className="divider" />

            <h2 className="panelTitle">Add a Post</h2>
            <NewPostForm
              form={form}
              error={error}
              onChange={this.handleChange}
              onImageChange={this.handleImageChange}
              onSubmit={this.addPost}
            />
          </aside>

          <main className="panel" id="home">
            <h2 className="panelTitle">Latest Posts</h2>

            {<PostGrid posts={posts} onLike={this.likePost} onDislike={this.dislikePost} />}
          </main>
        </div>
      </div>
    );
  }
}
