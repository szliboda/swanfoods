// 主页逻辑
let allHotels = [];
let filteredHotels = [];

// 页面加载
document.addEventListener('DOMContentLoaded', function() {
    loadDrivers();
    loadHotels();
});

// 加载司机列表
function loadDrivers() {
    const driverListEl = document.getElementById('driverList');
    const drivers = AppData.filters.drivers || [];
    
    // 颜色配置
    const colors = [
        { bg: '#e8f5e9', border: '#4caf50', avatar: '#2e7d32' },
        { bg: '#e3f2fd', border: '#2196f3', avatar: '#1565c0' },
        { bg: '#fff3e0', border: '#ff9800', avatar: '#ef6c00' },
        { bg: '#fce4ec', border: '#e91e63', avatar: '#c2185b' },
        { bg: '#f3e5f5', border: '#9c27b0', avatar: '#7b1fa2' },
        { bg: '#e0f2f1', border: '#009688', avatar: '#00695c' }
    ];
    
    driverListEl.innerHTML = drivers.map((name, index) => {
        const color = colors[index % colors.length];
        return `
            <div class="driver-item" onclick="selectDriver('${name}')" 
                 style="background: ${color.bg}; border-left: 4px solid ${color.border};">
                <div class="driver-avatar" style="background: ${color.avatar};">${name[0]}</div>
                <div class="driver-name">${name}</div>
                <span class="arrow">></span>
            </div>
        `;
    }).join('');
}

// 选择司机
function selectDriver(driverName) {
    navigateTo(`login.html?driver=${encodeURIComponent(driverName)}`);
}

// 跳转到管理员登录
function goToAdmin() {
    navigateTo('login.html?type=admin');
}

// 加载酒店数据
function loadHotels() {
    allHotels = AppData.deliveryData || [];
    filteredHotels = [...allHotels];
    
    // 更新司机筛选下拉框
    const driverFilter = document.getElementById('driverFilter');
    const drivers = AppData.filters.drivers || [];
    driverFilter.innerHTML = '<option value="">全部司机</option>' + 
        drivers.map(d => `<option value="${d}">${d}</option>`).join('');
}

// 显示酒店弹窗
function showHotelModal() {
    document.getElementById('hotelModal').style.display = 'flex';
    filterHotels();
}

// 隐藏酒店弹窗
function hideHotelModal() {
    document.getElementById('hotelModal').style.display = 'none';
}

// 筛选酒店
function filterHotels() {
    const keyword = document.getElementById('hotelSearchInput').value.trim().toLowerCase();
    const driverFilter = document.getElementById('driverFilter').value;
    
    // 显示/隐藏清除按钮
    document.getElementById('clearSearch').style.display = keyword ? 'block' : 'none';
    
    filteredHotels = allHotels.filter(item => {
        // 司机筛选
        if (driverFilter && item.driver !== driverFilter) {
            return false;
        }
        
        // 关键词筛选
        if (keyword) {
            const hotelMatch = item.hotel && item.hotel.toLowerCase().includes(keyword);
            const contactMatch = item.contact && item.contact.toLowerCase().includes(keyword);
            const phoneMatch = item.phone && item.phone.includes(keyword);
            return hotelMatch || contactMatch || phoneMatch;
        }
        
        return true;
    });
    
    renderHotelList();
}

// 渲染酒店列表
function renderHotelList() {
    const container = document.getElementById('hotelListContainer');
    document.getElementById('hotelCount').textContent = `共 ${filteredHotels.length} 家`;
    
    if (filteredHotels.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🏨</div>
                <div class="empty-text">暂无酒店</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredHotels.map(item => `
        <div class="hotel-card">
            <div class="hotel-header">
                <span class="hotel-name">${item.hotel}</span>
                <span class="driver-tag ${item.driver === '？' || !item.driver ? 'unassigned' : ''}">
                    ${item.driver && item.driver !== '？' ? item.driver : '未分配'}
                </span>
            </div>
            <div class="hotel-info">
                ${item.time ? `<span class="info-item">⏰ ${item.time}</span>` : ''}
                ${item.contact ? `<span class="info-item">👤 ${item.contact}</span>` : ''}
                ${item.phone ? `<span class="info-item">📞 ${item.phone}</span>` : ''}
                ${item.remark ? `<span class="info-item remark">📝 ${item.remark}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// 清除搜索
function clearHotelSearch() {
    document.getElementById('hotelSearchInput').value = '';
    filterHotels();
}
