import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { LINKS } from "../enum/links.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import { HACKATHON } from "../enum/hackathon.enum"

export abstract class Info {

  logger = Logger.prototype.getInstance();

  @Command("info")
  @Description("Sends information about the hackathon to the author")
  @Guard(NotBot)
  async info(command: CommandMessage): Promise<void> {
    this.logger.info("Sending Info");

    const embed = new MessageEmbed();
    embed
      .setTitle(`Hackathon Info`)
      .setDescription(
        `Here is the link to the Site for [${HACKATHON.Name}](${LINKS.SITE}).\nPlease check the [GitHub Repo for me also!](${LINKS.REPO})\n`
      )
      .setColor(COLOR.BLUE)
      .setThumbnail(LINKS.LOGO)
      .setFooter("Powered by Discord.TS!");

    command.reply({ embed }).then((messageSent) => {
      this.logger.info(`Sent Info : message id ${messageSent.id}`);
    });
  }

  @Command("signup")
  @Guard(NotBot)
  async signup(command: CommandMessage): Promise<void> {
    this.logger.info("Sending Signup");

    command.reply("Please signup here! " + LINKS.SIGNUP).then((messageSent) => {
      this.logger.info(`Sent Info : message id ${messageSent.id}`);
    });
  }
}