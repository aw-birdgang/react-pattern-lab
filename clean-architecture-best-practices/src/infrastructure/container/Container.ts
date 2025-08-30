import { AxiosHttpClient } from '@/shared/infrastructure/HttpClient';
import { HttpUserRepository } from '@/features/user/infrastructure/HttpUserRepository';
import { HttpPostRepository } from '@/features/post/infrastructure/HttpPostRepository';
import { UserRepository } from '@/features/user/repository/UserRepository';
import { PostRepository } from '@/features/post/repository/PostRepository';

export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.initializeServices();
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private initializeServices(): void {
    // HTTP Client
    const httpClient = new AxiosHttpClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api');
    this.services.set('httpClient', httpClient);

    // Repositories
    const userRepository = new HttpUserRepository(httpClient);
    this.services.set('userRepository', userRepository);

    const postRepository = new HttpPostRepository(httpClient);
    this.services.set('postRepository', postRepository);
  }

  public get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service as T;
  }

  public getUserRepository(): UserRepository {
    return this.get<UserRepository>('userRepository');
  }

  public getPostRepository(): PostRepository {
    return this.get<PostRepository>('postRepository');
  }

  public getHttpClient(): AxiosHttpClient {
    return this.get<AxiosHttpClient>('httpClient');
  }
}
