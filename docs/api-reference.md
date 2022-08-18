# API Reference

## Controlled

### createControlled()

```ts
createContainer(container: Container) => ControlledFunc
```

Creates a new Controlled function connected to an instance of Containor.

### controlled()

```ts
controlled<T>(token: Token<T>, method: string): RequestHandler
```

Creates a request handler for Express that calls the specified method on the controller registered on the provided token.
