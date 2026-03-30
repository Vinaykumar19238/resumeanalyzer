# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
# Copy package files and install dependencies
COPY Frontend/resumeanalyzer/package*.json ./
RUN npm install
# Copy frontend source and build
COPY Frontend/resumeanalyzer ./
RUN npm run build

# Stage 2: Build Backend
FROM maven:3.9.6-eclipse-temurin-17-alpine AS backend-build
WORKDIR /app/backend
# Copy the frontend build to the static resources folder of the backend
# This allows Spring Boot to serve the frontend as static content
COPY --from=frontend-build /app/frontend/dist /app/backend/src/main/resources/static
# Copy backend source and build
COPY Backend/backend/pom.xml .
COPY Backend/backend/src ./src
RUN mvn clean package -DskipTests

# Stage 3: Run the Application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
