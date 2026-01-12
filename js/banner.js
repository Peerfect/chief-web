// 轮播图功能和新闻数据管理

// 模拟新闻数据源
const newsData = [
    {
        title: "全球金融市场迎来新一轮波动，投资者需谨慎应对",
        image: "https://picsum.photos/1200/450?random=1"
    },
    {
        title: "数字货币监管政策出台，行业迎来规范化发展",
        image: "https://picsum.photos/1200/450?random=2"
    },
    {
        title: "新兴经济体增长势头强劲，国际贸易格局生变",
        image: "https://picsum.photos/1200/450?random=3"
    },
    {
        title: "央行货币政策调整预期升温，市场利率面临变化",
        image: "https://picsum.photos/1200/450?random=4"
    },
    {
        title: "科技股表现抢眼，人工智能板块持续走强",
        image: "https://picsum.photos/1200/450?random=5"
    },
    {
        title: "大宗商品价格震荡，供应链问题仍待解决",
        image: "https://picsum.photos/1200/450?random=6"
    }
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