import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import { Events } from "../interfaces/schedule.interface"
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { AirtablePlusPlus } from "airtable-plusplus"
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
        const table = new AirtablePlusPlus({
            baseID: process.env.AIRTABLE_BASE_ID,
            tableName: 'Schedule',
            apiKey: process.env.AIRTABLE_API_KEY
        });
        this.logger.info("Sending Schedule");

        const eventMsg = new MessageEmbed({
            type: 'rich',
            title: 'ScribeHacks Schedule',
            description: `Here is the Schedule for ScribeHacks!`,
            color: COLOR.ORANGE,
        });

        const events = await table.read();

        events.forEach(function (event) {
            this.logger.info(event.fields)
            // const date = Date.parse(event.fields.Time);
            // if (event.fields.Time >= new Date()) {
            const eventTime = formatDate(event.fields.Time);
            eventMsg.addField(event.fields.Name, "hello", false)
            // }
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
            events.forEach(function (event) {
            this.logger.info("Test1");
            this.logger.info(event.fields);
            })
        });
    }
}