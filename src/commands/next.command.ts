import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { LINK } from "../enum/links.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

export abstract class Next {

    logger = Logger.prototype.getInstance();

  /**
   * @name next
   * @param command
   * object is command message from the author.
   * @description
   * Sends the next event happening in the schedule.enum.ts.
   */
  @Command("next")
  @Description("Sends the next event happening in the schedule.")
  @Guard(NotBot)
  async info(command: CommandMessage): Promise<void> {
    this.logger.info("Sending Next Event");

    const embed = new MessageEmbed();
    embed
      .setTitle(`ScribeHacks Info`)
      .setDescription(
        `Here is the link to the Site for [ScribeHacks](${LINK.SITE}).\nPlease check the [GitHub Repo for me also!](${LINK.REPO})\n`
      )
      .setColor(COLOR.BLUE)
      .setThumbnail(LINK.LOGO)
      .setFooter("Powered by Discord.TS!");

    command.reply({ embed }).then((messageSent) => {
      this.logger.info(`Sent Info : message id ${messageSent.id}`);
    });
  }
}