document.addEventListener("DOMContentLoaded", function () {
    const postButton = document.getElementById("postButton");
    const postText = document.getElementById("postText");
    const postList = document.getElementById("postList");
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    // ローカルストレージから投稿内容を読み込む
    loadPosts();

    // 投稿機能
    postButton.addEventListener("click", function () {
        let text = postText.value.trim();
        if (text === "") {
            alert("投稿内容を入力してください！");
            return;
        }

        // 新しい投稿を作成
        let post = createPost(text);
        
        // 投稿をローカルストレージに保存
        savePost(text);

        // 投稿をリストに追加
        postList.insertBefore(post, postList.firstChild);

        postText.value = "";
    });

    // タブ切り替え機能
    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();

            // すべてのタブのアクティブクラスを削除
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // クリックされたタブにアクティブクラスを追加
            tab.classList.add("active");

            // 対応するコンテンツを表示
            const tabId = tab.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("active");
        });
    });

    // 投稿を作成する関数
    function createPost(text) {
        let post = document.createElement("article");
        post.classList.add("post");

        let userInfo = document.createElement("div");
        userInfo.classList.add("user-info");

        let userImg = document.createElement("img");
        userImg.src = "user_icon.jpg";
        userImg.alt = "User Icon";

        let userDetails = document.createElement("div");
        let username = document.createElement("span");
        username.classList.add("username");
        username.textContent = "@my_account";

        let timestamp = document.createElement("span");
        timestamp.classList.add("timestamp");
        timestamp.textContent = "・たった今";

        userDetails.appendChild(username);
        userDetails.appendChild(timestamp);

        userInfo.appendChild(userImg);
        userInfo.appendChild(userDetails);

        let postContent = document.createElement("p");
        postContent.textContent = text;

        post.appendChild(userInfo);
        post.appendChild(postContent);

        return post;
    }

    // ローカルストレージから保存されている投稿を読み込む関数
    function loadPosts() {
        let savedPosts = JSON.parse(localStorage.getItem("posts"));
        if (savedPosts) {
            savedPosts.forEach(text => {
                let post = createPost(text);
                postList.appendChild(post);
            });
        }
    }

    // 投稿をローカルストレージに保存する関数
    function savePost(text) {
        let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts.push(text);
        localStorage.setItem("posts", JSON.stringify(savedPosts));
    }
});
