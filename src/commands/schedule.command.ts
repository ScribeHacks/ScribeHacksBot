import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import { Events } from "../interfaces/schedule.interface"
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";

export abstract class Schedule {

    logger = Logger.prototype.getInstance();

    /**
     * @name Schedule
     * @param command
     * object is command message from the author.
     * @description
     *
     */
    @Command("Schedule")
    @Description("Sends information about the hackathon to the author")
    @Guard(NotBot)
    async Schedule(command: CommandMessage): Promise<void> {
        this.logger.info("Sending Schedule");

        const eventMsg = new MessageEmbed({
            type: 'rich',
            title: 'ScribeHacks Schedule',
            description: `Here is the Schedule for ScribeHacks!`,
            color: COLOR.ORANGE,
        });

        Events.forEach(function (event) {
            if (event.time >= new Date()) {
                const eventTime = formatDate(event.time);
                eventMsg.addField(event.name, eventTime, false)
            }
        })

        function formatDate(date) {
            const d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear(),
                hour = d.getHours();

            let newHour = hour % 12;
            newHour = hour ? hour % 12 : 12;

            const dateAdded = [day, month, year].join('-');
            return newHour + ':00' + ' ' + dateAdded;
        }



        command.reply(eventMsg).then((messageSent) => {
            this.logger.info(`Sent Schedule : message id ${messageSent.id}`);
        });
    }
}