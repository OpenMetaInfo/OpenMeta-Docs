# 系统部署

## Java 镜像
### 使用 Docker-Compose 运行容器镜像
在docker-compose.yml中配置数据库访问地址。
`docker-compose up -d`


### 制作基础镜像
编译需要依赖JDK环境，但最终运行只需要依赖JRE环境。
使用 mvnw 可以避免编译时依赖maven镜像，显著减少镜像文件的大小。

制作基础镜像:
`docker build -t openmeta/base_image:v1 -f deploy/base_image/Dockerfile .`


### 制作业务服务镜像
业务服务镜像依赖基础镜像。

制作业务服务镜像:
`docker build -t openmeta/core:v1 -f core/Dockerfile .`
