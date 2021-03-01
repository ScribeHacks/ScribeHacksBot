import { Discord, On, Client, CommandNotFound, Command, CommandMessage, Guard } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { COMMANDS } from "../enum/commands.enum";
import { LINK } from "../enum/links.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

export abstract class Help {

    logger = Logger.prototype.getInstance();

  /**
   * @name Help
   * @param command
   * object is command message from the author.
   * @description
   * A simple help command that will provide help for other commands.
   */
  @Command("help")
  @Guard(NotBot)
  async info(command: CommandMessage): Promise<void> {
    this.logger.info("Sending Help");
    console.log(COMMANDS);

    const embed = new MessageEmbed();
    embed
      .setTitle(`ScribeHacks Help`)
      .setDescription(
        `Hello I am the ScribeHacks Support Bot, what may I assist you with? \n \n Use \`!help [command]\` to get more information about a specific command. \n \n Our current commands are: \n ${Object.keys(COMMANDS)}`
      )
      .setColor(COLOR.GREEN)
      .setThumbnail(LINK.LOGO)
      .setFooter("Powered by Discord.TS!");

    command.reply({ embed }).then((messageSent) => {
      this.logger.info(`Sent Info : message id ${messageSent.id}`);
    });
  }
}