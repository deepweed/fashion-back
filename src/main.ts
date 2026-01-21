import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  });

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 2556); //TODO: поменять port в будущем
}
bootstrap();
