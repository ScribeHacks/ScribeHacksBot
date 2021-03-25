import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { ADMIN_COMMANDS, COMMANDS_FUN_1, COMMANDS_FUN_2, COMMANDS_INFO } from "../enum/commands.enum";
import { Admin } from "../guards/Admin.guard";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

interface helpArgs {
  helpVersion?: string;
  helpPage?: number;
}

export abstract class Help {

  logger = Logger.prototype.getInstance();

  @Command("help :helpVersion :helpPage")
  @Description("A simple help command that will provide help for other commands.")
  @Guard(NotBot)
  async help(command: CommandMessage<helpArgs>): Promise<void> {
    this.logger.info("Sending Help");

    const { helpVersion, helpPage } = command.args;
    this.logger.info(helpVersion);

    if (helpVersion == undefined) {
      const helpMsg = new MessageEmbed({
        type: 'rich',
        title: 'ScribeHacks Help',
        description: `Hello I am the ScribeHacks Support Bot, what may I assist you with?`,
        color: COLOR.GREEN,
      });

      helpMsg.addField("Please use !help info or !help fun [1,2]", "!help info or !help fun [1,2]", false);

      command.reply(helpMsg).then((messageSent) => {
        this.logger.info(`Sent help : message id ${messageSent.id}`);
      });
    }

    else if (helpVersion === "fun") {
      if (helpPage === undefined || helpPage === 0 || helpPage === 1) {
        this.logger.info(helpVersion.valueOf());
        const helpMsg = new MessageEmbed({
          type: 'rich',
          title: 'ScribeHacks Help',
          description: `Hello I am the ScribeHacks Support Bot, what may I assist you with?`,
          color: COLOR.GREEN,
        });

        // For loop to count how many commands there are and add a field to helpMsg
        for (const [key, value] of Object.entries(COMMANDS_FUN_1)) {
          helpMsg.addField(key, value, false);
        }

        command.reply(helpMsg).then((messageSent) => {
          this.logger.info(`Sent help : message id ${messageSent.id}`);
        });
      }
      else if (helpPage === 2) {
        this.logger.info(helpVersion.valueOf());
        const helpMsg = new MessageEmbed({
          type: 'rich',
          title: 'ScribeHacks Help',
          description: `Hello I am the ScribeHacks Support Bot, what may I assist you with?`,
          color: COLOR.GREEN,
        });

        // For loop to count how many commands there are and add a field to helpMsg
        for (const [key, value] of Object.entries(COMMANDS_FUN_2)) {
          helpMsg.addField(key, value, false);
        }

        command.reply(helpMsg).then((messageSent) => {
          this.logger.info(`Sent help : message id ${messageSent.id}`);
        });
      }
    }

    else if (helpVersion === "info") {
      this.logger.info(helpVersion.valueOf());
      const helpMsg = new MessageEmbed({
        type: 'rich',
        title: 'ScribeHacks Help',
        description: `Hello I am the ScribeHacks Support Bot, what may I assist you with?`,
        color: COLOR.GREEN,
      });

      // For loop to count how many commands there are and add a field to helpMsg
      for (const [key, value] of Object.entries(COMMANDS_INFO)) {
        helpMsg.addField(key, value, false);
      }

      command.reply(helpMsg).then((messageSent) => {
        this.logger.info(`Sent help : message id ${messageSent.id}`);
      });
    }
  }

  @Command("adminhelp")
  @Description("A command to list all the admin only commands and their use.")
  @Guard(NotBot, Admin)
  async adminhelp(command: CommandMessage): Promise<void> {
    this.logger.info("Sending adminhelp");

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
      this.logger.info(`Sent admin help : message id ${messageSent.id}`);
    });
  }
}