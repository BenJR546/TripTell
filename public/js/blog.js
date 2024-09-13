document.addEventListener("DOMContentLoaded", (event) => {
  const modal = document.getElementById("blog-modal");
  const btn = document.getElementById("add-blog-button");
  const span = document.getElementsByClassName("close")[0];
  const blogGrid = document.querySelector(".blog-grid");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const form = document.getElementById("new-blog-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(form);

    // Log form data
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      console.log("Sending fetch request");
      // Update the fetch URL to match your server route
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      console.log("Response received", response.status, response.statusText);
      const contentType = response.headers.get("content-type");
      console.log("Content-Type:", contentType);

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        console.log("Parsed JSON data:", data);
        if (!response.ok) {
          throw new Error(data.message || "Failed to create blog post");
        }
        addBlogToDOM(data);
        modal.style.display = "none";
        form.reset();
      } else {
        const text = await response.text();
        console.error("Received non-JSON response:", text);
        throw new Error("Received non-JSON response from server");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  });
  function addBlogToDOM(blog) {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";
    blogCard.innerHTML = `
        <img src="${
          blog.image_url || "/images/default-blog-image.jpg"
        }" class="blog-img" alt="${escapeHTML(blog.title)}">
        <div class="blog-content">
          <h3 class="blog-title">${escapeHTML(blog.title)}</h3>
          <p class="blog-text">${escapeHTML(blog.content)}</p>
          <p class="blog-author">By ${escapeHTML(
            blog.user ? blog.user.username : "Unknown"
          )}</p>
        </div>
      `;
    blogGrid.prepend(blogCard);

    // If there was a "no posts" message, remove it
    const noPostsMessage = blogGrid.querySelector("p");
    if (
      noPostsMessage &&
      noPostsMessage.textContent.includes("No blog posts found")
    ) {
      noPostsMessage.remove();
    }
  }

  function escapeHTML(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[tag] || tag)
    );
  }
});

let likeButtons = document.querySelectorAll(".likeBtn");
let dislikeButtons = document.querySelectorAll(".dislikeBtn");
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", function () {
    let blog_id = this.getAttribute("data-blog-id");
    const response = fetch("/api/blog/like", {
      method: "POST",
      body: JSON.stringify({ blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // if (response.ok) {
    window.location.reload();
    // }
  });
}
for (let i = 0; i < dislikeButtons.length; i++) {
  dislikeButtons[i].addEventListener("click", function () {
    let blog_id = this.getAttribute("data-blog-id");
    const response = fetch("/api/blog/dislike", {
      method: "POST",
      body: JSON.stringify({ blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.reload();
    }
  });
}
