import { Discord, On, Client, CommandNotFound, Command, CommandMessage, Guard } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { LINK } from "../enum/links.enum";
import { NotBot } from "../guard/NotABot.guard";
import { Logger } from "../logger/logger.service";

export abstract class Docs {

    logger = Logger.prototype.getInstance();

  /**
   * @name info
   * @param command
   * object is command message from the author.
   * @description
   * Sends information about the hackathon to the author.
   */
  @Command("info")
  @Guard(NotBot)
  async info(command: CommandMessage): Promise<void> {
    this.logger.info("Sending Info");

    const embed = new MessageEmbed();
    embed
      .setTitle(`Hackathon Info`)
      .setDescription(
        `Here is the link to the Site for [Hackathon](${LINK.SITE}).\nPlease check the [GitHub Repo for me also!](${LINK.REPO})\n`
      )
      .setColor(COLOR.BLUE)
      .setThumbnail(LINK.LOGO)
      .setFooter("Powered by Discord.TS!");

    command.reply({ embed }).then((messageSent) => {
      this.logger.info(`Sent Info : message id ${messageSent.id}`);
    });
  }
}