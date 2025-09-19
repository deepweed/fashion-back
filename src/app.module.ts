import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { path } from "app-root-path";
import { ProductModule } from './product/product.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: "/uploads",
    }),
    ProductModule,
    PaginationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
