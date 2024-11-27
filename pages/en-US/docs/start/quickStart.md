# Quick Start Guide
This section introduces how to quickly launch related applications locally.

## 1. Clone the Code Repository
```bash
git clone https://github.com/OpenMetaInfo/OpenMeta.git
```
The files required for quick launch are located in the `./deploy` directory.

## 2. Run the Minimal Application (mini-app)
The mini-app is a minimal application that only depends on the web module. It can be used to verify general interface capabilities and access system metadata via general interfaces.

### 2.1 Method 1: Run with Docker Compose
```bash
docker-compose -f deploy/mini-app/docker-compose.yml up -d
```

### 2.2 Method 2: Run the mini-app from Source Code
1. Load the Maven module using an IDE.
2. Configure the Redis and database connection information in the `application-dev.yml` file.
3. Execute the SQL scripts in `./deploy/mini-app/init_mysql` in the MySQL database.
4. Set the profile to `dev` and run the main program of the mini-app.

### 2.3 Call OpenAPI Interfaces
The API path for the mini-app is: `/api/mini`

#### 2.3.1 View API Documentation
The Swagger API documentation for the mini-app is available at:
[http://localhost/api/mini/swagger-ui/index.html](http://localhost/api/mini/swagger-ui/index.html)

#### 2.3.2 Import OpenAPI Interfaces
After starting the local service, you can import the OpenAPI documentation into tools like ApiFox. The OpenAPI documentation for the mini-app is available at:
[http://localhost/api/mini/v3/api-docs](http://localhost/api/mini/v3/api-docs)

#### 2.3.3 Call via curl
```bash
curl -X POST 'http://localhost/api/mini/SysField/searchPage' \
-H 'Content-Type: application/json' \
-d '{}'
```

## 3. Run the demo-app Application
The demo-app is an experimental application that relies on newly added starters developed during the process. It is used to verify new feature capabilities and thus requires more preparation.

Since the demo application depends on ElasticSearch and RocketMQ, these services must be running first, or it must connect to an existing ElasticSearch and RocketMQ testing environment.

### 3.1 Run ElasticSearch and RocketMQ
If there is an existing ElasticSearch and RocketMQ testing environment, you can skip these steps and directly create the necessary ES indices and message topics.

#### 3.1.1 Run ElasticSearch with Docker Compose
```bash
docker-compose -f deploy/efk/docker-compose.yml up -d
```
Kibana client access: [http://localhost:5601](http://localhost:5601)

#### 3.1.2 Run RocketMQ with Docker Compose
```bash
docker-compose -f deploy/rocketmq/docker-compose.yml up -d
```
RocketMQ client access: [http://localhost:8080](http://localhost:8080)

### 3.2 Run the Demo Application with Docker Compose
#### 3.2.1 Configure Environment Variables
If connecting to an existing ElasticSearch and RocketMQ, modify the environment variables of `demo-app` in `deploy/demo-app/docker-compose.yml`.
```yaml
  demo-app:
    image: openmeta/demo-app:0.7.3
    ports:
      - 80:80
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/demo?useUnicode=true&characterEncoding=utf-8&allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=GMT%2B8
      - SPRING_DATA_REDIS_HOST=redis
      - ROCKETMQ_NAME_SERVER=localhost:9876
      - SPRING_ELASTICSEARCH_CLUSTER=http://localhost:9200
      - SPRING_ELASTICSEARCH_USERNAME=your_username
      - SPRING_ELASTICSEARCH_PASSWORD=your_password
      - SPRING_ELASTICSEARCH_INDEX_CHANGELOG=demo_dev_changelog
    depends_on:
      - redis
      - mysql
```

#### 3.2.2 Run the Demo Application with Docker Compose
```bash
docker-compose -f deploy/demo-app/docker-compose.yml up -d
```

### 3.3 Call OpenAPI Interfaces
The API path for the demo-app is: `/api/demo`

#### 3.3.1 View API Documentation
The Swagger API documentation for the demo application is available at:
[http://localhost/api/demo/swagger-ui/index.html](http://localhost/api/demo/swagger-ui/index.html)

#### 3.3.2 Import OpenAPI Interfaces
After starting the local service, you can import the OpenAPI documentation into tools like ApiFox. The OpenAPI documentation for the demo-app is available at:
[http://localhost/api/demo/v3/api-docs](http://localhost/api/demo/v3/api-docs)

#### 3.3.3 Call via curl
```bash
curl -X POST 'http://localhost/api/demo/SysField/searchPage' \
-H 'Content-Type: application/json' \
-d '{}'
```