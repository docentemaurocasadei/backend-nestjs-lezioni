import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity'; // aggiunto

describe('PostsService (SQLite)', () => {
  let service!: PostsService;
  let module!: TestingModule;
  let createdPostId: number; // ← id condiviso tra i test

  beforeAll(async () => {
    try {
      module = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            entities: [Post, User, Category],
            synchronize: true,
          }),
          TypeOrmModule.forFeature([Post]),
        ],
        providers: [PostsService],
      }).compile();

      service = module.get<PostsService>(PostsService);
    } catch (e) {
      console.error('❌ beforeAll failed:', e); // ← mostra l'errore vero
    }
  }, 15000);

  afterAll(async () => {
    if (module) await module.close();
  });

  it('should create and fetch posts', async () => {
    const post = await service.create({ title: 'Test', content: 'Contenuto' });
    createdPostId = post.id; // ← salva l'id

    const posts = await service.findAll();
    expect(posts.length).toBe(1);
  });

  it('should update a post', async () => {
    await service.update(createdPostId, { title: 'Titolo aggiornato' });

    const posts = await service.findAll();
    expect(posts[0].title).toBe('Titolo aggiornato');
  });

  it('should delete a post', async () => {
    await service.remove(createdPostId);

    const posts = await service.findAll();
    expect(posts.length).toBe(0);
  });
});
