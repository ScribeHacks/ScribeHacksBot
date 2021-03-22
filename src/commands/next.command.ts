import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { LINK } from "../enum/links.enum";
import { NotBot } from "../guards/NotABot.guard";
import { Events } from "../interfaces/schedule.interface";
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
  async next(command: CommandMessage): Promise<void> {
    this.logger.info("Sending Next Event");

    let i = 1;
    Events.forEach(function (event) {
      if (event.time >= new Date()) {
        if (i == 1) {
          i++;
          const time = getTimeRemaining(event.time)
          command.reply("The next event is " + "`" + event.name + "`" + " is in " + time.days + " days " + time.hours + " hours " + time.minutes + " and minutes " + time.seconds + " seconds.");
        }
      }
    })

    function getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.now();
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return {
        total,
        days,
        hours,
        minutes,
        seconds
      };
    }

  }
}