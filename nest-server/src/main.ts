import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
// const SECRET = process.env.SECRET;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  app.use(
    session({
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: 'SECRET',
      cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        httpOnly: false,
        // we would want to set secure=true in a production environment
        secure: false,
      },
    }),
  );
  await app.listen(3001);
  console.log(`(☞ﾟヮﾟ)☞ Stuff happening at  http://localhost:3001 ☜(ﾟヮﾟ☜)`);
}
bootstrap();
