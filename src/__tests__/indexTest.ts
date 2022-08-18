import { createContainer, token, Container } from "containor";
import { Request, Response, NextFunction } from "express";
import { createControlled } from "../index";

let container: Container;

beforeEach(() => {
  container = createContainer();
});

test("Creates a controller and calls a method", () => {
  const callback = jest.fn();
  const controlled = createControlled(container);
  const testController = token<TestController>("testController");

  class TestController {
    get(...args: any[]): void {
      callback(...args);
    }
  }

  container.add(testController, TestController);

  const handler = controlled(testController, "get");

  handler(
    "req" as unknown as Request,
    "res" as unknown as Response,
    "next" as unknown as NextFunction
  );

  expect(callback).toHaveBeenCalledWith("req", "res", "next");
});

test("Uses default method", () => {
  const callback = jest.fn();
  const controlled = createControlled(container);
  const testController = token<TestController>("testController");

  class TestController {
    invoke(...args: any[]): void {
      callback(...args);
    }
  }

  container.add(testController, TestController);

  const handler = controlled(testController);

  handler(
    "req" as unknown as Request,
    "res" as unknown as Response,
    "next" as unknown as NextFunction
  );

  expect(callback).toHaveBeenCalledWith("req", "res", "next");
});

test("Uses custom default method", () => {
  const callback = jest.fn();
  const controlled = createControlled(container, { defaultMethod: "run" });
  const testController = token<TestController>("testController");

  class TestController {
    run(...args: any[]): void {
      callback(...args);
    }
  }

  container.add(testController, TestController);

  const handler = controlled(testController);

  handler(
    "req" as unknown as Request,
    "res" as unknown as Response,
    "next" as unknown as NextFunction
  );

  expect(callback).toHaveBeenCalledWith("req", "res", "next");
});

test("Throws if method does not exist", () => {
  const controlled = createControlled(container, { defaultMethod: "run" });
  const testController = token<TestController>("testController");

  class TestController {}

  container.add(testController, TestController);

  const handler = controlled(testController);

  expect(() => {
    handler(
      "req" as unknown as Request,
      "res" as unknown as Response,
      "next" as unknown as NextFunction
    );
  }).toThrow(`Method "run" does not exist on instance "testController".`);
});

test("Throws if controller is not defined.", () => {
  const controlled = createControlled(container, { defaultMethod: "run" });
  const testController = token<null>("testController");

  container.constant(testController, null);

  const handler = controlled(testController);

  expect(() => {
    handler(
      "req" as unknown as Request,
      "res" as unknown as Response,
      "next" as unknown as NextFunction
    );
  }).toThrow(`Instance for "testController" not found.`);
});
