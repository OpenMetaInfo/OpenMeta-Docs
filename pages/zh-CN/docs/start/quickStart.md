# 快速入门

## 1、拉取代码仓库
```bash
git clone https://github.com/OpenMetaInfo/OpenMeta.git
```

## 2、运行 Demo 应用
### 2.1 方式一：Docker Compose 运行
```bash
docker-compose -f deploy/demo-app/docker-compose.yml up -d
```

## 2.2、方式二：源码运行 Demo 应用
* （1）使用 IDE 加载 Maven 模块。
* （2）配置 application-dev.yml 文件中的 Redis、Database 连接信息。
* （3）在 MySQL 数据库执行 ./deploy/demo-app/init_mysql 中的 SQL 脚本。
* （3）配置 Profile 为 dev，并运行 demo-app 应用的主程序。

## 4、调用 API 接口
通过 API 工具，如 ApiFox 或 Postman，调用接口进行测试。
```bash
curl -X POST 'http://localhost/api/demo/SysModel/searchPage' \
-H 'Content-Type: application/json' \
-d '{}'
```
