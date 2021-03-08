import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { ADMIN_COMMANDS, COMMANDS } from "../enum/commands.enum";
import { Admin } from "../guards/Admin.guard";
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
  @Description("A simple help command that will provide help for other commands.")
  @Guard(NotBot)
  async info(command: CommandMessage): Promise<void> {
    this.logger.info("Sending Help");

    const helpMsg = new MessageEmbed({
      type: 'rich',
      title: 'ScribeHacks Help',
      description: `Hello I am the ScribeHacks Support Bot, what may I assist you with?`,
      color: COLOR.GREEN,
    });

    // For loop to count how many commands there are and add a field to helpMsg
    for (const [key, value] of Object.entries(COMMANDS)) {
      helpMsg.addField(key, value, false);
    }

    command.reply(helpMsg).then((messageSent) => {
      this.logger.info(`Sent Info : message id ${messageSent.id}`);
    });
  }

  @Command("adminHelp")
  @Description("A command to list all the admin only commands and their use.")
  @Guard(NotBot, Admin)
  async adminHelp(command: CommandMessage): Promise<void> {
    this.logger.info("Sending adminHelp");

    const helpMsg = new MessageEmbed({
      type: 'rich',
      title: 'ScribeHacks Admin Help',
      description: `Hello I am the ScribeHacks Support Bot, what may I assist you with?`,
      color: COLOR.GOLD,
    });

    // For loop to count how many commands there are and add a field to helpMsg
    for (const [key, value] of Object.entries(ADMIN_COMMANDS)) {
      helpMsg.addField(key, value, false);
    }

    command.reply(helpMsg).then((messageSent) => {
      this.logger.info(`Sent Info : message id ${messageSent.id}`);
    });
  }
}
