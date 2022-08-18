import type { Request, Response, RequestHandler, NextFunction } from "express";
import type { Container, Token } from "containor";
import { ControlledFunc, ControlledConfig } from "./types";

const defaultConfig: ControlledConfig = {
  defaultMethod: "invoke",
};

export function createControlled(
  container: Container,
  config?: Partial<ControlledConfig>
): ControlledFunc {
  const cfg = { ...defaultConfig, ...config };

  return function controlled<T>(
    token: Token<T>,
    method?: keyof T
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const methodName = method || (cfg.defaultMethod as keyof T);
      const instance = container.get(token);

      if (!instance) {
        throw new Error(`Instance for "${token.name}" not found.`);
      }

      if (!(typeof instance[methodName] === "function")) {
        throw new Error(
          `Method "${String(methodName)}" does not exist on instance "${
            token.name
          }".`
        );
      }

      (instance[methodName] as unknown as RequestHandler)(req, res, next);
    };
  };
}
