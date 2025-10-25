import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { path } from "app-root-path";
import { ProductModule } from "./product/product.module";
import { PaginationModule } from "./pagination/pagination.module";
import { OrderModule } from './telegram/order/order.module';
import { PhoneModule } from './telegram/phone/phone.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: "/uploads",
    }),
    ProductModule,
    PaginationModule,
    OrderModule,
    PhoneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
