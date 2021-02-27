import { Client } from "@typeit/discord";
import { config as configDotenv } from "dotenv";
import { resolve } from "path";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start(): void {
    this._client = new Client();

    configDotenv({
      path: resolve(resolve(__dirname, "../env/env.variables")),
    });

    this._client.login(
      process.env.DISCORD_TOKEN,
      `${__dirname}/*.ts`,
      `${__dirname}/*.js`
    );
  }
}

Main.start();