import { Discord, Description, On, ArgsOf } from "@typeit/discord";
import { Logger } from "./services/logger.service";
import * as chalk from "chalk";
import * as Path from "path";

@Discord("!", {
  import: [
    Path.join(__dirname, "commands", "*.ts"),
    Path.join(__dirname, "commands", "*.js"),
    Path.join(__dirname, "guild", "*.ts"),
    Path.join(__dirname, "guild", "*.js"),
    Path.join(__dirname, "member", "*.ts"),
    Path.join(__dirname, "member", "*.js"),
  ],
})
@Description("Main Discord event handlers.")
export abstract class Starter {
  logger = Logger.prototype.getInstance();

  /**
   * @name initialize
   * @description
   * When bot has logged in output bot is ready.
   */
  @On("ready")
  initialize(): void {
    this.logger.info("info check");
    this.logger.warn("warning check");
    this.logger.error("error check");
    this.logger.info(chalk.bold("BOT READY"));
    this.logger.info(Path.join(__dirname, "commands", "*.ts"));
    this.logger.info(Path.join(__dirname, "guild", "*.ts"));
    this.logger.info(Path.join(__dirname, "member", "*.ts"));
  }

  /**
   * @name error
   * @description
   * When client has a discord error log it here.
   */
  @On("error")
  error([error]: ArgsOf<"error">): void {
    this.logger.error(`${chalk.bold("BOT ERROR")}: ${error}`);
  }

  // @On("raw")
  // async onEvent(event: any): Promise<any> {

  // }
}