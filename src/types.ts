import type { Token } from "containor";
import type { RequestHandler } from "express";

export type ControlledFunc = (token: Token, method?: unknown) => RequestHandler;

export type ControlledConfig = {
  defaultMethod: string;
};
