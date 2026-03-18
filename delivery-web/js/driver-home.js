// 司机主页逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    if (!checkLogin('driver')) return;
    
    // 显示司机信息
    const driverName = AppData.currentDriver;
    document.getElementById('driverName').textContent = driverName;
    document.getElementById('driverAvatar').textContent = driverName[0];
});

// 修改密码
function changePassword() {
    const newPassword = prompt('请输入新密码（至少4位）：');
    if (!newPassword) return;
    
    if (newPassword.length < 4) {
        showToast('密码至少4位', 'error');
        return;
    }
    
    const confirmPassword = prompt('请再次输入新密码：');
    if (newPassword !== confirmPassword) {
        showToast('两次密码不一致', 'error');
        return;
    }
    
    if (AppData.changeDriverPassword(AppData.currentDriver, newPassword)) {
        showToast('密码修改成功');
    }
}

// 退出登录
function logout() {
    AppData.logout();
    navigateTo('index.html');
}

// 跳转到送货单
function goToDeliveryImages() {
    showToast('功能开发中...');
}

// 跳转到酒店搜索
function goToHotelSearch() {
    showToast('功能开发中...');
}

// 跳转到我的酒店
function goToMyHotels() {
    navigateTo('my-hotels.html');
}

// 跳转到地图
function goToMap() {
    showToast('功能开发中...');
}
