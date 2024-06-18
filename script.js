document.addEventListener('DOMContentLoaded', function() {
    const endpoint = 'https://jsonplaceholder.typicode.com/users/1/posts';
    const postsContainer = document.getElementById('posts-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const postsPerPage = 9;
    let currentPage = 1;
    let posts = [];

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            posts = data;
            renderPosts();
        })
        .catch(error => console.error('Error fetching posts:', error));

    function renderPosts() {
        postsContainer.innerHTML = '';
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = posts.slice(start, end);

        paginatedPosts.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h3');
            title.textContent = post.title;

            const body = document.createElement('p');
            body.textContent = post.body;

            card.appendChild(title);
            card.appendChild(body);
            postsContainer.appendChild(card);
        });

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === Math.ceil(posts.length / postsPerPage);
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(posts.length / postsPerPage)) {
            currentPage++;
            renderPosts();
        }
    });
});
