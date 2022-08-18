# Guide

Using controlled requires basic knowledge on how to use [Express](https://expressjs.com) and [Containor](https://ngerritsen.gitlab.io/containor). As it combines these to use Express with DI.

## Basic usage

1. Create a controller with a `get` method using the same signature as an Express request handler.
2. Create tokens to register our dependencies with.
3. Initialize Containor, Express and Controlled.
4. Register our controller with the DI container using our token.
5. Register a route with Express using Controlled to create the handler that calls our controller.
6. We start our Express app!

```ts
import express, { Request, Response } from "express";
import { createContainer, token } from "containor";
import { createControlled } from "controlled";

const app = express();
const container = createContainer();
const controlled = createControlled(container);

const tokens = {
  healthController: token<HealthController>("healthController"),
};

class HealthController {
  get(req: Request, res: Response): void {
    res.sendStatus(200);
  }
}

container.add(tokens.healthController, HealthController);

app.get("/health", controlled(tokens.healthController, "get"));

app.listen(8080);
```

> Our `HealthController` is only constructed when the `/health` endpoint is actually called, this prevents any code being run or database connections from being made when not actually used.

## Services

Since our controller is retrieved by Controlled from the DI container, we can register services at the DI container and it just works! For more advanced DI usecases refer to the [Containor docs](https://ngerritsen.gitlab.io/containor).

```ts
class TodoRepository {
  async getAll(): Todo[] {
    // Retrieve todo's from data source
  }
}

class TodoController {
  constructor(private TodoRepository repository) {}

  async getAll(req: Request, res: Response): void {
    const todos = await respository.getAll();

    res.json(todos);
  }
}

const tokens = {
  todoController: token<TodoController>("todoController"),
  todoRepository: token<TodoRepository>("todoRepository"),
};

container.add(tokens.todoController, TodoController, [tokens.todoRepository]);
container.add(tokens.todoRepository, TodoRepository);

app.get("/todos", controlled(tokens.todoController, "getAll"));
```

> The `TodoRepository` will be automatically constructed and injected into the `TodoController` whenever the request handler is called by Express! Controlled doesn't actually do anything extra here, Dependency injection is all handled by Containor.

## Middleware

Controlled can also be used for middleware, it actually works the same as a controller.

```ts
class LoggerMiddleware {
  invoke(req: Request, res: Response, next: NextFunction): void {
    console.log(`${req.method} request being made to "${req.path}".`);
    next();
  }
}

const tokens = {
  loggerMiddleware: token<LoggerMiddleware>("loggerMiddleware"),
};

app.use(controlled(tokens.loggerMiddleware));
```

> Controlled get an instance of `LoggerMiddleware` from the DI and let Express call the `invoke` method on it.

If you don't want to use the invoke method you can configure Controlled to use a different default method:

```ts
const controlled = createControlled(container, { defaultMethod: "run" });
```

Or just specify the method like with controllers:

```
app.use(controlled(tokens.loggerMiddleware, "run"));
```
