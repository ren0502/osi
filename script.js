document.addEventListener("DOMContentLoaded", function () {
    const postButton = document.getElementById("postButton");
    const postText = document.getElementById("postText");
    const postList = document.getElementById("postList");
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    // ローカルストレージから投稿を読み込む
    loadPosts();

    // 投稿機能
    postButton.addEventListener("click", function () {
        let text = postText.value.trim();
        if (text === "") {
            alert("投稿内容を入力してください！");
            return;
        }

        let post = createPost(text);
        savePost(text);
        postList.insertBefore(post, postList.firstChild);

        postText.value = "";
    });

    // タブ切り替え
    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
        });
    });

    function createPost(text) {
        let post = document.createElement("article");
        post.classList.add("post");
        post.innerHTML = `<div class="user-info">
            <img src="user_icon.jpg" alt="User Icon" class="user-icon">
            <span class="username">@my_account</span>
        </div>
        <p>${text}</p>`;
        return post;
    }

    function loadPosts() {
        let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts.forEach(text => {
            postList.appendChild(createPost(text));
        });
    }

    function savePost(text) {
        let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts.push(text);
        localStorage.setItem("posts", JSON.stringify(savedPosts));
    }
});
