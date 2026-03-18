// 我的配送酒店页面逻辑
let myHotels = [];
let filteredHotels = [];

document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    if (!checkLogin('driver')) return;
    
    loadMyHotels();
});

// 加载我的酒店
function loadMyHotels() {
    const driverName = AppData.currentDriver;
    myHotels = AppData.deliveryData.filter(item => item.driver === driverName);
    filteredHotels = [...myHotels];
    
    document.getElementById('hotelCount').textContent = myHotels.length;
    renderHotels();
}

// 渲染酒店列表
function renderHotels() {
    const container = document.getElementById('hotelList');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredHotels.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = filteredHotels.map((item, index) => `
        <div class="hotel-card">
            <div class="hotel-header">
                <span class="hotel-num">${index + 1}</span>
                <span class="hotel-name">${item.hotel}</span>
            </div>
            
            <div class="hotel-info">
                <div class="info-row">
                    <span class="info-label">配送时间：</span>
                    <span class="info-value">${item.time || '待定'}</span>
                </div>
                ${item.contact ? `
                <div class="info-row">
                    <span class="info-label">联系人：</span>
                    <span class="info-value">${item.contact}</span>
                </div>
                ` : ''}
                ${item.phone ? `
                <div class="info-row">
                    <span class="info-label">电话：</span>
                    <span class="phone-value" onclick="makeCall('${item.phone}')">${item.phone} 📞</span>
                </div>
                ` : ''}
            </div>
            
            ${item.phone ? `
            <div class="hotel-actions">
                <span class="action-btn-small call" onclick="makeCall('${item.phone}')">📞 拨打电话</span>
            </div>
            ` : ''}
        </div>
    `).join('');
}

// 搜索酒店
function searchHotels() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    
    // 显示/隐藏清除按钮
    document.getElementById('clearBtn').style.display = keyword ? 'block' : 'none';
    
    if (!keyword) {
        filteredHotels = [...myHotels];
    } else {
        filteredHotels = myHotels.filter(item => 
            item.hotel.toLowerCase().includes(keyword)
        );
    }
    
    renderHotels();
}

// 清除搜索
function clearSearch() {
    document.getElementById('searchInput').value = '';
    filteredHotels = [...myHotels];
    document.getElementById('clearBtn').style.display = 'none';
    renderHotels();
}

// 拨打电话
function makeCall(phone) {
    window.location.href = `tel:${phone}`;
}
