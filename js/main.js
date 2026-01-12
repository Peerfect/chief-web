// 牛投财经网站交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取顶部横幅和头部元素
    const topBanner = document.querySelector('.top-banner');
    const header = document.querySelector('.header');

    let lastScrollTop = 0;

    // 滚动事件监听器
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 根据滚动方向显示/隐藏顶部横幅
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏顶部横幅
            if (topBanner) {
                topBanner.classList.add('hidden');
            }
        } else {
            // 向上滚动，显示顶部横幅
            if (topBanner) {
                topBanner.classList.remove('hidden');
            }
        }

        lastScrollTop = scrollTop;
    });

    // 返回顶部功能
    const backTopBtn = document.querySelector('.back-top');
    if (backTopBtn) {
        backTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToTop();
        });
    }

    // 平滑滚动到顶部
    function smoothScrollToTop() {
        const scrollStep = -window.scrollY / 15;
        const scrollInterval = setInterval(function() {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }

    // 监听滚动事件，控制返回顶部按钮显示隐藏
    window.addEventListener('scroll', function() {
        const backTopBtn = document.querySelector('.back-top');
        if (backTopBtn) {
            if (window.pageYOffset > 300) {
                backTopBtn.style.display = 'flex';
            } else {
                backTopBtn.style.display = 'none';
            }
        }
    });

    // 初始化时检查滚动位置
    if (document.querySelector('.back-top')) {
        if (window.pageYOffset > 300) {
            document.querySelector('.back-top').style.display = 'flex';
        } else {
            document.querySelector('.back-top').style.display = 'none';
        }
    }

    // 文章链接点击统计（模拟）
    const articleLinks = document.querySelectorAll('.article-link');
    articleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Article clicked:', this.textContent.trim());
            // 这里可以添加实际的点击统计逻辑
        });
    });

    // 类别项目悬停效果
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 更多链接点击效果
    const moreLinks = document.querySelectorAll('.section-more');
    moreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionTitle = this.closest('.section-header').querySelector('.section-title').textContent;
            alert(`跳转到${sectionTitle}详情页面`);
            // 这里可以添加实际的跳转逻辑
        });
    });

    // 友情链接点击统计
    const friendLinks = document.querySelectorAll('#friend-menu a');
    friendLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Friend link clicked:', this.title || this.textContent);
        });
    });

    // 添加搜索功能（如果存在搜索框）
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    // 添加节流函数用于优化滚动事件
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 优化滚动事件监听器
    window.addEventListener('scroll', throttle(function() {
        // 可以在这里添加需要节流的滚动相关逻辑
    }, 100));

    // 添加页面加载动画
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            section.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(section);
        });
    }

    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
            e.preventDefault();
            const searchBox = document.querySelector('input[type="search"]');
            if (searchBox) {
                searchBox.focus();
            }
        }
        
        // ESC 关闭可能的模态框或下拉菜单
        if (e.keyCode === 27) {
            closeOpenMenus();
        }
    });

    // 关闭打开的菜单或模态框
    function closeOpenMenus() {
        // 这里可以添加关闭菜单或模态框的逻辑
        console.log('Closing open menus/modals');
    }

    // 移动端菜单切换功能
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none'; // 默认隐藏，在媒体查询中显示
    
    // 添加移动端适配检测
    if (window.innerWidth < 768) {
        handleMobileLayout();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            handleMobileLayout();
        } else {
            handleDesktopLayout();
        }
    });

    function handleMobileLayout() {
        // 移动端布局处理
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.classList.add('mobile-nav');
        }
    }

    function handleDesktopLayout() {
        // 桌面端布局处理
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.classList.remove('mobile-nav');
        }
    }

    // 添加性能监控
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }

    // 添加错误处理
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
    });
});

// 搜索功能
function performSearch(query) {
    if (query.trim() !== '') {
        console.log('Searching for:', query);
        // 这里可以添加实际的搜索逻辑
        alert(`搜索 "${query}" 的结果`);
    }
}

// 工具函数：格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 页面可见性API - 当页面可见时执行某些操作
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面变为可见时的操作
        console.log('Page is now visible');
    }
});

// QQ对话框功能 - 确保只弹出一个
let activeQQDialog = null;

// 获取QQ触发器和对话框元素
const qqTrigger = document.querySelector('.qq-trigger');
const qqDialog = document.querySelector('.qq-dialog');

// 确保对话框初始状态为隐藏
if (qqDialog) {
    qqDialog.style.display = 'none';
}

if (qqTrigger && qqDialog) {
    // 点击QQ触发区域时切换对话框显示
    qqTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // 隐藏任何当前活动的QQ对话框
        if (activeQQDialog && activeQQDialog !== qqDialog) {
            activeQQDialog.style.display = 'none';
        }
        
        // 计算触发元素相对于视口的位置
        const triggerRect = qqTrigger.getBoundingClientRect();
        
        // 设置对话框位置，相对于视口定位
        qqDialog.style.top = (triggerRect.bottom + window.scrollY + 10) + 'px';  // 位于触发元素下方，考虑页面滚动
        qqDialog.style.left = (triggerRect.left + window.scrollX) + 'px';       // 水平对齐触发元素左侧
        
        // 如果对话框当前是隐藏的，则显示它；如果是显示的，则隐藏它
        if (qqDialog.style.display === 'block') {
            qqDialog.style.display = 'none';
            activeQQDialog = null;
        } else {
            qqDialog.style.display = 'block';
            activeQQDialog = qqDialog;
        }
    });
    
    // 点击页面其他地方隐藏对话框
    document.addEventListener('click', function(e) {
        if (!qqTrigger.contains(e.target)) {
            if (qqDialog.style.display === 'block') {
                qqDialog.style.display = 'none';
                activeQQDialog = null;
            }
        }
    });
}


