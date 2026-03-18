// 全局应用数据
const AppData = {
    // 当前登录状态
    isLoggedIn: false,
    userRole: '', // 'admin' 或 'driver'
    currentDriver: '',
    
    // 管理员密码
    adminPassword: localStorage.getItem('adminPassword') || 'admin123',
    
    // 司机账号
    driverAccounts: JSON.parse(localStorage.getItem('driverAccounts') || '{}'),
    
    // 配送数据
    deliveryData: JSON.parse(localStorage.getItem('deliveryData') || '[]'),
    
    // 筛选选项
    filters: {
        drivers: JSON.parse(localStorage.getItem('drivers') || '["张师傅", "李师傅", "王师傅"]'),
        hotels: [],
        times: []
    },
    
    // 初始化数据
    init() {
        // 如果没有数据，添加示例数据
        if (this.deliveryData.length === 0) {
            this.deliveryData = [
                { id: 1, hotel: '示例酒店A', time: '08:00', driver: '张师傅', contact: '张三', phone: '13800138001', remark: '正门进' },
                { id: 2, hotel: '示例酒店B', time: '09:30', driver: '张师傅', contact: '李四', phone: '13800138002', remark: '' },
                { id: 3, hotel: '示例酒店C', time: '10:00', driver: '李师傅', contact: '王五', phone: '13800138003', remark: '后门卸货' }
            ];
            this.saveData();
        }
        
        // 初始化司机账号
        this.filters.drivers.forEach(driver => {
            if (!this.driverAccounts[driver]) {
                this.driverAccounts[driver] = {
                    password: this.getPinyin(driver),
                    isFirstLogin: true
                };
            }
        });
        this.saveAccounts();
        
        this.updateFilters();
    },
    
    // 保存数据到本地存储
    saveData() {
        localStorage.setItem('deliveryData', JSON.stringify(this.deliveryData));
        this.updateFilters();
    },
    
    saveAccounts() {
        localStorage.setItem('driverAccounts', JSON.stringify(this.driverAccounts));
    },
    
    savePassword(password) {
        this.adminPassword = password;
        localStorage.setItem('adminPassword', password);
    },
    
    // 更新筛选选项
    updateFilters() {
        const hotels = [...new Set(this.deliveryData.map(item => item.hotel))];
        const times = [...new Set(this.deliveryData.map(item => item.time).filter(Boolean))];
        this.filters.hotels = hotels;
        this.filters.times = times;
        localStorage.setItem('drivers', JSON.stringify(this.filters.drivers));
    },
    
    // 获取拼音首字母（简化版）
    getPinyin(name) {
        // 这里简化处理，实际应该用拼音库
        const pinyinMap = {
            '张师傅': 'zs', '李师傅': 'ls', '王师傅': 'ws',
            '刘师傅': 'lius', '陈师傅': 'cs', '杨师傅': 'ys'
        };
        return pinyinMap[name] || name.toLowerCase().replace(/[^a-z]/g, '');
    },
    
    // 获取司机的订单
    getDriverOrders(driverName) {
        return this.deliveryData.filter(item => item.driver === driverName);
    },
    
    // 验证司机登录
    verifyDriver(driverName, password) {
        const account = this.driverAccounts[driverName];
        if (!account) return false;
        
        const validPassword = account.isFirstLogin ? this.getPinyin(driverName) : account.password;
        if (password === validPassword) {
            this.isLoggedIn = true;
            this.userRole = 'driver';
            this.currentDriver = driverName;
            return true;
        }
        return false;
    },
    
    // 验证管理员登录
    verifyAdmin(password) {
        if (password === this.adminPassword) {
            this.isLoggedIn = true;
            this.userRole = 'admin';
            return true;
        }
        return false;
    },
    
    // 登出
    logout() {
        this.isLoggedIn = false;
        this.userRole = '';
        this.currentDriver = '';
    },
    
    // 修改司机密码
    changeDriverPassword(driverName, newPassword) {
        if (this.driverAccounts[driverName]) {
            this.driverAccounts[driverName].password = newPassword;
            this.driverAccounts[driverName].isFirstLogin = false;
            this.saveAccounts();
            return true;
        }
        return false;
    },
    
    // 重置司机密码
    resetDriverPassword(driverName) {
        const defaultPwd = this.getPinyin(driverName);
        if (this.driverAccounts[driverName]) {
            this.driverAccounts[driverName].password = defaultPwd;
            this.driverAccounts[driverName].isFirstLogin = true;
            this.saveAccounts();
        }
        return defaultPwd;
    }
};

// 初始化
AppData.init();

// 页面跳转工具
function navigateTo(url) {
    window.location.href = url;
}

function goBack() {
    window.history.back();
}

// 检查登录状态
function checkLogin(role) {
    if (!AppData.isLoggedIn || (role && AppData.userRole !== role)) {
        navigateTo('index.html');
        return false;
    }
    return true;
}

// 显示提示
function showToast(message, type = 'info') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'error' ? '#ef4444' : '#2d5a45'};
        color: #fff;
        padding: 16px 32px;
        border-radius: 12px;
        font-size: 16px;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 显示确认对话框
function showConfirm(title, content, onConfirm) {
    if (confirm(content)) {
        onConfirm();
    }
}
