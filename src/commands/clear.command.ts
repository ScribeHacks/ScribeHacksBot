import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { Admin } from "../guards/Admin.guard";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

interface amountArgs {
    amount: number;
}

export abstract class Clear {

    logger = Logger.prototype.getInstance();

    @Command("clear :amount")
    @Description("Clears from 1-99 messages based on which number is provided")
    @Guard(NotBot, Admin)
    async clear(command: CommandMessage<amountArgs>): Promise<void> {
        this.logger.info("Sending Clear");

        const { amount } = command.args;

        if (amount > 0 && amount < 100 && command.channel.type === 'text') {
            try {
                command.delete();
                command.channel.bulkDelete(amount);
            }
            catch (e) {
                this.logger.info("Couldn't delete some messages");
            }
        }

        else {
            command.reply("Unable to clear messages. Make sure that you are not in a dm and that your number is greater than 0 and less than 100!");
        }
    }
}