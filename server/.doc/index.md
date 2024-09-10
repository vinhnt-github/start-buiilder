When working with NestJS, it's important to understand its core concepts and how they work together to create scalable, maintainable, and efficient applications. Below is an overview of the main concepts you should remember:

1. Modules

- Purpose: Modules are the building blocks of a NestJS application, used to organize code into cohesive blocks. Each module encapsulates related functionality and can include services, controllers, and providers.
- Root Module: Every application has a root module (usually AppModule), which serves as the entry point.
- Feature Modules: These are additional modules that group related features, like UsersModule, AuthModule, etc.

```
    @Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule {}
```

2. Controllers

- Purpose: Controllers handle incoming HTTP requests and return responses. They define the routing of your application and delegate processing to services.
- Routing: Decorators like @Get(), @Post(), @Put(), etc., define routes within the controller.
- Dependency Injection: Controllers often inject services to handle business logic.

```
   @Controller('users')
   export class UsersController {
   constructor(private readonly usersService: UsersService) {}
```

```
    @Get()
    findAll() {
    return this.usersService.findAll();
    }
```

3. Providers

- Purpose: Providers are responsible for handling the business logic and can be injected into other components (controllers, other providers, etc.) using dependency injection. Services are the most common form of providers.
- Singletons: Providers are usually singletons, meaning the same instance is shared across the application.
- Dependency Injection: Providers can be injected into other classes through the constructor.

```

    @Injectable()
    export class UsersService {
        findAll() {
        return ['user1', 'user2'];
        }
    }
```

4. Dependency Injection

- Purpose: Dependency Injection (DI) is a core concept in NestJS, allowing the framework to manage the creation and resolution of dependencies for various components (controllers, services, etc.).
  How it Works: By using @Injectable() and constructor injection, dependencies are automatically resolved by NestJS.
- Custom Providers: You can define custom providers with specific tokens and use factories to create them.

```
constructor(private readonly usersService: UsersService) {}
```

5. Middleware
   Purpose: Middleware functions execute during the request-response cycle before the route handler is invoked. They can be used for tasks like logging, authentication, etc.
   Global or Scoped: Middleware can be applied globally or to specific routes.

```
export function logger(req, res, next) {
console.log(`Request...`);
next();
}

```

@Module({
imports: [],
})
export class AppModule implements NestModule {

configure(consumer: MiddlewareConsumer) {
consumer.apply(logger).forRoutes('users');
}
}

```
6. Guards
- Purpose: Guards are used to implement authorization logic. They determine whether a request should be handled by the route handler.
- CanActivate Method: Guards implement the CanActivate interface, which has a canActivate() method that returns a boolean or a promise resolving to a boolean.

```

@Injectable()
export class AuthGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
// Authorization logic
return true;
}
}

7. Pipes

- Purpose: Pipes are used for transforming and validating input data before it reaches the controller's route handler.
- Built-in Pipes: NestJS provides built-in pipes like ValidationPipe, ParseIntPipe, etc.
- Custom Pipes: You can create custom pipes by implementing the PipeTransform interface.

```
@Injectable()
export class ValidationPipe implements PipeTransform {
transform(value: any) {
// Validation logic
return value;
}
}

8. Interceptors
- Purpose: Interceptors can transform the response or handle additional logic before or after the route handler is called. They can also be used for logging, caching, or modifying the outgoing response.
handle() Method: Interceptors implement the NestInterceptor interface with the intercept() method.

```

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
console.log('Before...');
return next.handle().pipe(tap(() => console.log('After...')));
}
}

9. Filters

- Purpose: Exception filters handle errors thrown by route handlers. You can create custom filters to handle specific exceptions or all exceptions globally.
- Built-in Filters: NestJS provides built-in exception filters like HttpExceptionFilter.
- Custom Filters: You can create custom filters by implementing the ExceptionFilter interface.

```
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
catch(exception: HttpException, host: ArgumentsHost) {
const response = host.switchToHttp().getResponse();
const status = exception.getStatus();
response.status(status).json({
statusCode: status,
message: exception.message,
});
}
}

10. Exception Handling
- Purpose: NestJS uses exceptions to handle errors. Exceptions are thrown when an error occurs, and they can be caught by exception filters.
- Built-in Exceptions: NestJS provides built-in HTTP exceptions like BadRequestException, NotFoundException, etc.
- Custom Exceptions: You can create custom exceptions by extending the built-in exception classes.

```

throw new BadRequestException('Invalid input data');

11. Asynchronous Programming

- Async/Await and Promises: Since NestJS is built on top of Node.js, it leverages asynchronous programming using async/await or Promises. All providers, controllers, and middleware can handle asynchronous logic.
- RxJS: NestJS integrates with RxJS (Reactive Extensions for JavaScript) to handle asynchronous streams. It is particularly useful in microservices or event-driven architectures.

```
@Get()
async findAll(): Promise<User[]> {
return this.usersService.findAll();
}
```

12. Testing

- Purpose: Testing is a first-class citizen in NestJS, and it supports unit and end-to-end testing out of the box.
- Jest: By default, NestJS uses Jest for testing, and the Test utility is provided to create a testing module for unit tests.

```

describe('UsersService', () => {
let service: UsersService;

beforeEach(async () => {
const module = await Test.createTestingModule({
providers: [UsersService],
}).compile();

    service = module.get<UsersService>(UsersService);

});

it('should be defined', () => {
expect(service).toBeDefined();
});
});
```

13. Decorators

- Purpose: NestJS heavily relies on decorators to define metadata and inject dependencies. Some common decorators include @Controller(), @Injectable(), @Get(), @Post(), @Param(), @Body(), etc.
- Custom Decorators: You can also create custom decorators to encapsulate repetitive logic or functionality.

```
@Controller('users')
export class UsersController {
@Get(':id')
getUser(@Param('id') id: string) {
return this.usersService.findById(id);
}
}
```

14. Microservices

- Purpose: NestJS supports microservices architecture out of the box, allowing you to build distributed systems. It provides abstractions for various communication protocols like TCP, Redis, NATS, MQTT, and more.
- Transporters: The microservices package uses transporters to handle communication between services.

```

@Controller()
export class AppController {
@MessagePattern({ cmd: 'sum' })
accumulate(data: number[]): number {
return (data || []).reduce((a, b) => a + b);
}
}


Conclusion
These core concepts provide the foundation for developing scalable and maintainable applications in NestJS. Understanding how to organize your code into modules, handle requests with controllers, manage business logic with providers, and leverage dependency injection is key to mastering NestJS.
```
