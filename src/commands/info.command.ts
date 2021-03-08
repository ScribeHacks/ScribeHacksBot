import { Discord, On, Client, CommandNotFound, Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { LINK } from "../enum/links.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

export abstract class Info {

    logger = Logger.prototype.getInstance();

  /**
   * @name info
   * @param command
   * object is command message from the author.
   * @description
   * Sends information about the hackathon to the author.
   */
  @Command("info")
  @Description("Sends information about the hackathon to the author")
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