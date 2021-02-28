import { Description, On, ArgsOf } from "@typeit/discord";
import { ID } from "../enum/id.enum";

import { Logger } from "../logger/logger.service";

@Description("Discord Guild Event Handlers")
export abstract class GuildEvents {
  logger = Logger.prototype.getInstance();

  /**
   * @name guildJoin
   * @param param guild - server that the bot just joined.
   * @description
   * Checks if the new guild is discord.ts server. if it is not it leaves the server.
   */
  @On("guildCreate")
  async guildJoin([guild]: ArgsOf<"guildCreate">): Promise<void> {
    this.logger.info(`Bot added to the Discord Server : ${guild.name}`);

    if (guild.id !== ID.SERVER_ID) {
      guild
        .leave()
        .then((oldGuild) => {
          this.logger.info(`Bot successfully left Server : ${oldGuild.id}`);
        })
        .catch(() => {
          this.logger.error(`Bot unable to leave Server : ${guild.id}`);
        });
    }
  }

}