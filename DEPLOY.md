# 部署指南

## 第一步：创建 MongoDB Atlas 数据库

1. 访问 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) 并注册账号
2. 创建免费集群（Free Tier）
3. 在 Clusters 页面，点击 "Connect" 按钮
4. 选择 "Connect your application"
5. 复制连接字符串，格式类似：
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## 第二步：配置环境变量

1. 登录 Vercel 控制台：https://vercel.com/dashboard
2. 点击 "Add New" → "Project"
3. 导入你的 GitHub 仓库
4. 在项目设置中，点击 "Environment Variables"
5. 添加以下变量：

   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | 你的 MongoDB 连接字符串（替换密码） |
   | `MONGODB_DB` | `portfolio` |

6. 点击 "Save"

## 第三步：部署后端 API

1. 在 Vercel 项目中，点击 "Deployments"
2. 点击 "Create Deployment" 或触发新的 Git push
3. 等待部署完成
4. 部署成功后，API 地址为：`https://你的项目名.vercel.app/api/contact`

## 第四步：部署前端

1. 同样在 Vercel 上部署前端项目
2. 前端会自动调用后端 API

## 测试 API

部署完成后，可以用以下命令测试：

```bash
curl -X POST https://personal-portfolio-api.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"测试","contact":"123456","message":"测试消息","division":"1号 - 摄像纪实","concern":"无","fileName":""}'
```

## 查看数据库数据

在 MongoDB Atlas 控制台中，点击 "Collections"，选择 `portfolio` 数据库的 `contact_submissions` 集合查看提交的数据。
