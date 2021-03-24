import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import NekoClient = require("nekos.life");
import { Admin } from "../guards/Admin.guard";
import { HACKATHON } from "../enum/hackathon.enum";

export abstract class Fun {

    logger = Logger.prototype.getInstance();

    @Command("ban")
    @Description("Sends information about the hackathon to the author")
    @Guard(NotBot, Admin)
    async ban(command: CommandMessage): Promise<void> {
        this.logger.info("Sending ban");

        const user = command.mentions.members.first();
        user.ban();

        command.reply(user + "has been banned").then((messageSent) => {
            command.member.send("You have been banned from " + HACKATHON.Name)
            this.logger.info(`Sent Ban : message id ${messageSent.id}`);
        });
    }

    @Command("kick")
    @Guard(NotBot, Admin)
    async kick(command: CommandMessage): Promise<void> {
        this.logger.info("Sending kick");

        const user = command.mentions.members.first();
        user.kick();

        command.reply(user + "has been kicked").then((messageSent) => {
            command.member.send("You have been kicked from " + HACKATHON.Name)
            this.logger.info(`Sent Kick : message id ${messageSent.id}`);
        });
    }
}