import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import { MessageEmbed } from "discord.js";
import { COLOR } from "../enum/colors.enum";
import { AirtablePlusPlus } from "airtable-plusplus"
import { HACKATHON } from "../enum/hackathon.enum";
export abstract class Schedule {
    logger = Logger.prototype.getInstance();

    @Command("Schedule")
    @Description("Sends the schedule that was obtained via the AirTable")
    @Guard(NotBot)
    async Schedule(command: CommandMessage): Promise<void> {
        const table = new AirtablePlusPlus({
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: 'Schedule',
            apiKey: process.env.AIRTABLE_API_KEY
        });
        this.logger.info("Sending Schedule");

        const eventMsg = new MessageEmbed({
            type: 'rich',
            title: `${HACKATHON.Name} Schedule`,
            description: `Here is the Schedule for ${HACKATHON.Name}!`,
            color: COLOR.ORANGE,
        });

        const events = await (await table.read());

        events.forEach(function (event) {
            const eventTime = event.fields.Time + ", Day: " + event.fields.Day;
            eventMsg.addField(event.fields.Name, eventTime, false)
            // }
        })

        command.reply(eventMsg);
    }
}