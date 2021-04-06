import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import { Admin } from "../guards/Admin.guard";
import { HACKATHON } from "../enum/hackathon.enum";
import { Mention } from "../guards/Mention.guard";
import { ID } from "../enum/id.enum";

interface amountArgs {
    amount: number;
}

export abstract class Admins {

    logger = Logger.prototype.getInstance();

    @Command("ban")
    @Description("bans the user you @'d first")
    @Guard(NotBot, Admin, Mention)
    async ban(command: CommandMessage): Promise<void> {
        this.logger.info("Sending ban");

        const user = command.mentions.members.first();
        const role = command.guild.roles.cache.get(ID.ADMIN_ID);

        command.reply(user.displayName + " has been banned").then((messageSent) => {
            try {
                user.send("You have been banned from " + HACKATHON.Name)
            }
            catch (error) {
                this.logger.error("Unable to dm " + user.displayName);
            }
            this.logger.info(`Sent Ban : message id ${messageSent.id}`);
        });

        if (!command.member.roles.cache.has(role.id)) {
            user.ban();
        }
        else {
            this.logger.error("unable to ban " + user.displayName);
        }
    }

    @Command("kick")
    @Description("kicks the user you @'d first")
    @Guard(NotBot, Admin, Mention)
    async kick(command: CommandMessage): Promise<void> {
        this.logger.info("Sending kick");

        const user = command.mentions.members.first();

        const role = command.guild.roles.cache.get(ID.ADMIN_ID);

        command.reply(user.displayName + " has been kicked").then((messageSent) => {
            try {
                user.send("You have been kicked from " + HACKATHON.Name)
            }
            catch (error) {
                this.logger.error("Unable to dm " + user.displayName);
            }
            this.logger.info(`Sent Kick : message id ${messageSent.id}`);
        });

        if (!command.member.roles.cache.has(role.id)) {
            user.kick();
        }
        else {
            this.logger.error("unable to kick " + user.displayName);
        }
    }

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