// 获取网络图片的函数

// 模拟网络图片数据源
const networkImages = {
    articles: [
        "https://picsum.photos/300/200?random=1",
        "https://picsum.photos/300/200?random=2", 
        "https://picsum.photos/300/200?random=3",
        "https://picsum.photos/300/200?random=4",
        "https://picsum.photos/300/200?random=5",
        "https://picsum.photos/300/200?random=6"
    ],
    exposure: [
        "https://picsum.photos/400/250?random=7"
    ]
};

// 更新左侧图片
function updateLeftColumnImages() {
    const leftImageElements = document.querySelectorAll('.left-column img');
    
    // 为左侧6张图片分配网络图片
    for (let i = 0; i < leftImageElements.length && i < networkImages.articles.length; i++) {
        leftImageElements[i].src = networkImages.articles[i];
        leftImageElements[i].onerror = function() {
            // 如果网络图片加载失败，保持占位符效果
            this.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
            this.style.border = '1px solid #ddd';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = '12px';
            this.style.color = '#999';
        };
    }
}

// 更新右侧曝光台图片
function updateRightColumnImages() {
    const rightImageElements = document.querySelectorAll('.right-column img');
    
    // 为右侧曝光台图片分配网络图片
    for (let i = 0; i < rightImageElements.length && i < networkImages.exposure.length; i++) {
        rightImageElements[i].src = networkImages.exposure[i];
        rightImageElements[i].onerror = function() {
            // 如果网络图片加载失败，保持占位符效果
            this.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
            this.style.border = '1px solid #ddd';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = '12px';
            this.style.color = '#999';
        };
    }
}

// 页面加载完成后更新图片
document.addEventListener('DOMContentLoaded', function() {
    updateLeftColumnImages();
    updateRightColumnImages();
});