// 获取网络图片的函数

// 本地图片数据源
const localImages = {
    articles: [
        "./img/imgFiles/chief_1.jpg",
        "./img/imgFiles/chief_2.jpg", 
        "./img/imgFiles/chief_9.jpg",
        "./img/imgFiles/chief_4.jpg",
        "./img/imgFiles/chief_5.jpg",
        "./img/imgFiles/chief_6.jpg"
    ],
    exposure: [
        "./img/imgFiles/chief_7.jpg"
    ]
};

// 更新左侧图片
function updateLeftColumnImages() {
    const leftImageElements = document.querySelectorAll('.left-column img');
    
    // 为左侧6张图片分配本地图片
    for (let i = 0; i < leftImageElements.length && i < localImages.articles.length; i++) {
        leftImageElements[i].src = localImages.articles[i];
        leftImageElements[i].onerror = function() {
            // 如果本地图片加载失败，保持占位符效果
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
    
    // 为右侧曝光台图片分配本地图片
    for (let i = 0; i < rightImageElements.length && i < localImages.exposure.length; i++) {
        rightImageElements[i].src = localImages.exposure[i];
        rightImageElements[i].onerror = function() {
            // 如果本地图片加载失败，保持占位符效果
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