import type { LoaderComponent } from "../types";

const registry = new Map<string, LoaderComponent>();

export const LoaderRegistry = {
  add(name: string, comp: LoaderComponent) {
    registry.set(name.toLowerCase(), comp);
  },
  remove(name: string) {
    registry.delete(name.toLowerCase());
  },
  get(name: string) {
    return registry.get(name.toLowerCase());
  },
  list() {
    return Array.from(registry.keys()).sort();
  },
};
