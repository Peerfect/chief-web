// 新年烟花效果
class Fireworks {
    constructor() {
        this.container = null;
        this.colors = ['#ff5252', '#ffd740', '#69f0ae', '#448aff', '#e040fb', '#18ffff', '#ff4081'];
        this.init();
    }

    init() {
        // 确保DOM完全加载后再初始化
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createContainer();
                this.startFireworks();
            });
        } else {
            this.createContainer();
            this.startFireworks();
        }
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'newyear-fireworks';
        document.body.appendChild(this.container);
    }
    
    startFireworks() {
        // 立即创建一个烟花以测试效果
        setTimeout(() => {
            this.createFirework();
        }, 500);
        
        // 定期生成烟花
        setInterval(() => {
            this.createFirework();
        }, 3000); // 每3秒生成一次烟花，更淡雅
    }

    createFirework() {
        const x = 100 + Math.random() * (window.innerWidth - 200); // 避免边缘
        const y = 100 + Math.random() * (window.innerHeight / 2); // 只在上半部分显示

        console.log(`Creating firework at ${x}, ${y}`); // 调试信息

        // 创建烟花粒子
        const particleCount = 25 + Math.floor(Math.random() * 20); // 增加粒子数量
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y);
        }
    }

    createParticle(startX, startY) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        // 随机选择颜色
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px 2px ${color}`; // 增强发光效果

        // 随机角度和距离
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100; // 增加距离

        // 初始位置
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.opacity = '0';

        this.container.appendChild(particle);

        // 动画
        const startTime = Date.now();
        const duration = 1000 + Math.random() * 800; // 增加持续时间

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 计算当前位置
            const currentDistance = distance * progress;
            const x = startX + Math.cos(angle) * currentDistance;
            const y = startY + Math.sin(angle) * currentDistance;
            
            // 更新位置
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // 控制透明度变化：先显现再消失
            let opacity;
            if (progress < 0.3) {
                opacity = progress / 0.3; // 逐渐显现
            } else {
                opacity = 1 - ((progress - 0.3) / 0.7); // 逐渐消失
            }
            particle.style.opacity = Math.max(0, opacity).toString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        };

        requestAnimationFrame(animate);
    }
}

// 页面加载完成后初始化烟花效果
new Fireworks();