// 登录页面逻辑
let loginType = 'driver'; // 'driver' 或 'admin'
let driverName = '';

document.addEventListener('DOMContentLoaded', function() {
    // 解析URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    driverName = urlParams.get('driver');
    
    if (type === 'admin') {
        loginType = 'admin';
        setupAdminLogin();
    } else if (driverName) {
        loginType = 'driver';
        setupDriverLogin(driverName);
    } else {
        // 无参数，返回首页
        navigateTo('index.html');
    }
    
    // 自动聚焦密码输入框
    document.getElementById('password').focus();
});

// 设置司机登录
function setupDriverLogin(name) {
    document.getElementById('loginTitle').textContent = '司机登录';
    document.getElementById('driverInfo').style.display = 'block';
    document.getElementById('driverAvatar').textContent = name[0];
    document.getElementById('driverName').textContent = name;
    document.getElementById('loginHint').textContent = '初始密码为姓名拼音首字母小写';
}

// 设置管理员登录
function setupAdminLogin() {
    document.getElementById('loginTitle').textContent = '管理员登录';
    document.getElementById('driverInfo').style.display = 'none';
    document.getElementById('loginHint').textContent = '请输入管理员密码';
}

// 执行登录
function doLogin() {
    const password = document.getElementById('password').value.trim();
    
    if (!password) {
        showToast('请输入密码', 'error');
        return;
    }
    
    if (loginType === 'driver') {
        if (AppData.verifyDriver(driverName, password)) {
            showToast('登录成功');
            setTimeout(() => {
                navigateTo('driver-home.html');
            }, 500);
        } else {
            showToast('密码错误', 'error');
        }
    } else {
        if (AppData.verifyAdmin(password)) {
            showToast('登录成功');
            setTimeout(() => {
                navigateTo('admin.html');
            }, 500);
        } else {
            showToast('密码错误', 'error');
        }
    }
}
