import { MariaDb } from "../../../deps.ts";

export const mariaDb = await new MariaDb().connect({
  hostname: "127.0.0.1",
  port: 3366,
  db: "dq.relational",
  username: "root",
  password: "root",
});
