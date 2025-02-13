document.addEventListener("DOMContentLoaded", function () {
    const postButton = document.getElementById("postButton");
    const postText = document.getElementById("postText");
    const postList = document.getElementById("postList");
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    // 投稿機能
    postButton.addEventListener("click", function () {
        let text = postText.value.trim();
        if (text === "") {
            alert("投稿内容を入力してください！");
            return;
        }

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
});
