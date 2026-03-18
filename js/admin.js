// 管理员页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    if (!checkLogin('admin')) return;
    
    // 显示当前日期
    const now = new Date();
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    document.getElementById('currentDate').textContent = 
        `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${weekDays[now.getDay()]}`;
});

// 导入送货单
function goToImport() {
    showToast('功能开发中...');
}

// 查看送货单
function viewDeliveryImages() {
    showToast('功能开发中...');
}

// 用户管理
function showUserManagement() {
    showToast('功能开发中...');
}

// 司机账号
function showDriverAccounts() {
    const accounts = Object.entries(AppData.driverAccounts).map(([name, info]) => {
        const password = info.isFirstLogin ? AppData.getPinyin(name) : '********';
        return `${name}: ${password} ${info.isFirstLogin ? '(需重置)' : ''}`;
    }).join('\n');
    
    alert('司机账号：\n' + accounts);
}

// 配送路线
function goToMap() {
    showToast('功能开发中...');
}

// 酒店管理
function showHotelManagement() {
    showToast('功能开发中...\n请使用主页的酒店列表查看');
}

// 修改密码
function showPasswordModal() {
    const oldPassword = prompt('请输入当前密码：');
    if (!oldPassword) return;
    
    if (oldPassword !== AppData.adminPassword) {
        showToast('当前密码错误', 'error');
        return;
    }
    
    const newPassword = prompt('请输入新密码（至少4位）：');
    if (!newPassword || newPassword.length < 4) {
        showToast('密码至少4位', 'error');
        return;
    }
    
    const confirmPassword = prompt('请再次输入新密码：');
    if (newPassword !== confirmPassword) {
        showToast('两次密码不一致', 'error');
        return;
    }
    
    AppData.savePassword(newPassword);
    showToast('密码修改成功');
}

// 退出登录
function logout() {
    AppData.logout();
    navigateTo('index.html');
}
