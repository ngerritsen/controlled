# Controlled

[![Build Status](https://gitlab.com/ngerritsen/controlled/badges/master/pipeline.svg)](https://gitlab.com/ngerritsen/controlled/-/commits/master)

Minimal toolkit to use Express with DI. Powered by [Containor](https://ngerritsen.gitlab.io/containor/#/).

- Use controllers in Express with ease.
- Lazy instantiate controllers.
- Inject services using DI.
- Use middleware with DI.

## [📖 Documentation](https://ngerritsen.gitlab.io/controlled)

- [Getting Started](https://ngerritsen.gitlab.io/controlled/#/getting-started)
- [Motivation](https://ngerritsen.gitlab.io/controlled/#/motivation)
- [Guide](https://ngerritsen.gitlab.io/controlled/#/guide)
- [API Reference](https://ngerritsen.gitlab.io/controlled/#/api-reference)

# Getting started

Setting up Controlled is very simple, we need to have Express and Containor (for our dependency injection) too and we are good to go!

## Installation

Controlled (and Containor) can be installed by using any package manager using the npm repository.

```bash
npm install express containor controlled
```

With yarn:

```bash
yarn add express containor controlled
```

> Controlled ships with Typescript types included, these do not have to be installed separately.

### Basic usage

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

> As you can see, Controlled doesn't get in the way of your regular Express code, the only difference is the request handler is now created by Controlled!
