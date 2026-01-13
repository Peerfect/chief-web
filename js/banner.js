// 轮播图功能和新闻数据管理

// 模拟新闻数据源
const newsData = [
    {
        title: "国际金价一度突破4600美元大关 ，后市怎么走？",
        image: "https://n.sinaimg.cn/finance/crawl/45/w550h295/20260112/9386-c9d8d8f65778938853eb51fff1bdef83.png"
    },
    {
        title: "黄金，历史新纪录！有色ETF华宝（159876）量价齐升，续刷上市新高！近10日狂揽3.31亿元！",
        image: "https://n.sinaimg.cn/finance/crawl/784/w550h234/20260112/8a18-6cd8755a0a82e3a91a8e3fdee0286f98.png"
    },
    {
        title: "【点石成金】锡：高位加速，警惕价量波动",
        image: "https://image.sinajs.cn/newchart/v5/png/min/futures/ndaily/SN0.png"
    },
];

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    
    // 随机选择3条新闻来填充轮播图
    function getRandomNewsItems(count) {
        const shuffled = [...newsData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // 创建轮播图项
    function createCarouselItems() {
        // 清空现有内容
        carousel.innerHTML = '';
        
        // 获取随机新闻项
        const randomNews = getRandomNewsItems(3);
        
        randomNews.forEach((item, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item';
            
            carouselItem.innerHTML = `
                <div class="carousel-bg" style="background-image: url('${item.image}');"></div>
                <div class="carousel-title">${item.title}</div>
            `;
            
            carousel.appendChild(carouselItem);
        });
    }
    
    // 初始化轮播图
    createCarouselItems();
    
    // 获取当前轮播图项
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    function showNextSlide() {
        // 隐藏当前幻灯片
        carouselItems[currentIndex].classList.remove('active');
        
        // 更新索引
        currentIndex = (currentIndex + 1) % carouselItems.length;
        
        // 显示下一个幻灯片
        carouselItems[currentIndex].classList.add('active');
    }
    
    // 每5秒自动切换
    setInterval(showNextSlide, 5000);
});