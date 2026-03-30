# Stage 1: Build Frontend
FROM node:22-alpine AS frontend-build
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
# Copy backend source
COPY Backend/backend/pom.xml .
COPY Backend/backend/src ./src
# Copy the frontend build to the static resources folder of the backend
COPY --from=frontend-build /app/frontend/dist /app/backend/src/main/resources/static
# Build backend
RUN mvn clean package -DskipTests

# Stage 3: Run the Application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Use a more specific copy to avoid multiple jars if present
COPY --from=backend-build /app/backend/target/resumeAnalyzer-1.0.0.jar app.jar
EXPOSE 8080
# Optimize JVM for faster startup in container
ENTRYPOINT ["java", "-XX:+UseParallelGC", "-Xms256m", "-Xmx512m", "-jar", "app.jar"]
