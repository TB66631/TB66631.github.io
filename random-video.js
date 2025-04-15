// 替换成你的 GitHub 用户名和仓库名
const GITHUB_USER = "TB66631";
const REPO_NAME = "TB66631.github.io";
const VIDEOS_FOLDER = "Videos"; // 存放视频的文件夹名

async function fetchVideosList() {
    try {
        // 使用 GitHub API 获取 Videos 文件夹下的文件列表
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/${VIDEOS_FOLDER}`
        );
        
        if (!response.ok) {
            throw new Error("无法获取视频列表！");
        }

        const files = await response.json();
        
        // 过滤出 .mp4 文件
        const videoFiles = files.filter(
            file => file.name.toLowerCase().endsWith(".mp4")
        ).map(file => file.download_url);

        return videoFiles;
    } catch (error) {
        console.error("获取视频失败:", error);
        return [];
    }
}

async function loadRandomVideo() {
    const videos = await fetchVideosList();
    const videoPlayer = document.getElementById("videoPlayer");

    if (videos.length === 0) {
        alert("没有找到视频文件！请确保 Videos 文件夹内有 .mp4 文件。");
        return;
    }

    // 随机选择一个视频
    const randomVideoUrl = videos[Math.floor(Math.random() * videos.length)];
    videoPlayer.src = randomVideoUrl;
    videoPlayer.load();
    
    // 尝试自动播放（浏览器可能会阻止）
    videoPlayer.play().catch(e => console.log("自动播放被阻止:", e));
}

// 页面加载时自动播放一个随机视频
window.onload = loadRandomVideo;