# 天鹅配送系统 - 网页版

## 项目说明

这是一个从微信小程序转换而来的网页应用，用于配送管理。

## 文件结构

```
delivery-web/
├── index.html          # 主页（选择司机）
├── login.html          # 登录页面
├── driver-home.html    # 司机主页
├── admin.html          # 管理员界面
├── my-hotels.html      # 我的配送酒店
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── app.js          # 全局应用逻辑、数据存储
│   ├── index.js        # 主页逻辑
│   ├── login.js        # 登录逻辑
│   ├── driver-home.js  # 司机主页逻辑
│   ├── admin.js        # 管理员逻辑
│   └── my-hotels.js    # 酒店列表逻辑
└── images/
    └── logo.jpg        # Logo图片
```

## 功能特点

1. **纯前端实现** - 使用 LocalStorage 存储数据，无需后端服务器
2. **响应式设计** - 适配手机和电脑浏览器
3. **离线可用** - 可以作为静态网页部署

## 如何上线部署

### 方案一：GitHub Pages（免费，推荐）

1. **创建 GitHub 账号**
   - 访问 https://github.com 注册账号

2. **创建新仓库**
   - 点击 "New repository"
   - 仓库名：`delivery-app`（或其他名字）
   - 选择 "Public"
   - 点击 "Create repository"

3. **上传文件**
   - 将所有网页文件上传到仓库
   - 或者使用 Git 命令：
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/你的用户名/delivery-app.git
     git push -u origin main
     ```

4. **启用 GitHub Pages**
   - 进入仓库的 "Settings"
   - 左侧点击 "Pages"
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main"，文件夹选 "/ (root)"
   - 点击 "Save"
   - 等待几分钟，会显示访问链接如：`https://你的用户名.github.io/delivery-app/`

### 方案二：Vercel（免费，国内访问快）

1. **创建 Vercel 账号**
   - 访问 https://vercel.com
   - 用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 导入 GitHub 仓库
   - Framework Preset 选择 "Other"
   - 点击 "Deploy"

3. **获取域名**
   - 部署完成后会获得 `xxx.vercel.app` 域名
   - 可以在 Settings > Domains 绑定自己的域名

### 方案三：Netlify（免费）

1. **访问** https://www.netlify.com
2. 拖拽上传整个文件夹即可部署
3. 获得 `xxx.netlify.app` 域名

### 方案四：腾讯云/阿里云 OSS（国内访问最快）

1. **购买对象存储服务**
   - 腾讯云 COS 或 阿里云 OSS
   - 开启静态网站托管

2. **上传文件**
   - 上传所有网页文件到存储桶
   - 设置索引页为 `index.html`

3. **绑定域名**（可选）
   - 可以绑定自己的域名
   - 需要备案（国内服务器）

### 方案五：自己的服务器

如果有自己的服务器：

```bash
# 安装 Nginx
sudo apt install nginx

# 复制文件到网站目录
sudo cp -r delivery-web/* /var/www/html/

# 配置 Nginx
cat > /etc/nginx/sites-available/delivery << 'EOF'
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# 启用配置
sudo ln -s /etc/nginx/sites-available/delivery /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 默认账号

### 管理员
- 账号：admin
- 密码：admin123

### 司机
- 张师傅 / 密码：zs
- 李师傅 / 密码：ls
- 王师傅 / 密码：ws

初始密码为姓名拼音首字母小写。

## 数据备份

由于使用 LocalStorage 存储数据：

1. **导出数据**：在浏览器控制台执行 `localStorage.getItem('deliveryData')`
2. **导入数据**：执行 `localStorage.setItem('deliveryData', '...JSON数据...')`

## 注意事项

1. 数据存储在浏览器本地，清除浏览器数据会丢失
2. 建议定期导出数据备份
3. 如需多设备同步，建议增加后端服务器

## 技术栈

- HTML5
- CSS3（Flexbox 布局）
- JavaScript（ES6+）
- LocalStorage（本地存储）

## 浏览器支持

- Chrome/Edge（推荐）
- Safari
- Firefox
- 微信内置浏览器
