import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [PrismaService],
})
export class AppModule {}
