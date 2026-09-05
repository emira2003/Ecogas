// Lets Node's test runner understand the project's "@/…" imports and extension-less
// TypeScript imports. Used only by `npm test`.
import { register } from "node:module";
register("./test-resolver.mjs", import.meta.url);
