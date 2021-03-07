import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

export abstract class Pods {

    logger = Logger.prototype.getInstance();

    /**
     * @name pods
     * @param command
     * object is command message from the author.
     * @description
     * Creates "pods" channels for every team and assigns a mentor to the channel.
     */
    @Command("pods")
    @Description("Sends information about the hackathon to the author")
    @Guard(NotBot)
    async Pods(command: CommandMessage): Promise<void> {
        this.logger.info("Sending Pods");

        command.reply("Executed the command!").then((messageSent) => {
            this.logger.info(`Sent Info : message id ${messageSent.id}`);
        });
    }
}