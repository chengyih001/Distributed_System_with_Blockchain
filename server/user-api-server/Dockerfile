FROM amazoncorretto:21.0.1-alpine3.18
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
