import {NestFactory, Reflector} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as cookieParser from "cookie-parser";
import { RolesGuard } from "./auth/guards/roles.guard";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors({origin: ['http://localhost:3000'], credentials: true});
    app.use(cookieParser());
    await app.listen(5000);
}

bootstrap();
