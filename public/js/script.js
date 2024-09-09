document.querySelector('#new-blog-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const image_url = document.querySelector('#image_url').value.trim();
  
    if (title && content) {
      // Make the POST request to create a new blog post
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          image_url
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const newBlog = await response.json(); // Get the new blog post data
        
        // Select the container where blogs are displayed
        const blogContainer = document.querySelector('.container');
  
        // Append the new blog post to the container dynamically
        blogContainer.innerHTML += `
          <div class="card mb-3">
            <img src="${newBlog.image_url}" class="card-img-top" alt="${newBlog.title}">
            <div class="card-body">
              <h5 class="card-title">${newBlog.title}</h5>
              <p class="card-text">${newBlog.content}</p>
              <p class="card-text"><small class="text-muted">By ${newBlog.user.username}</small></p>
            </div>
          </div>
        `;
  
        // Reset the form after submission
        document.querySelector('#new-blog-form').reset();
      } else {
        alert('Failed to add blog post');
      }
    }
  });
  