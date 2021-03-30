import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import { COLOR } from "../enum/colors.enum";
import { MessageEmbed } from "discord.js";
import { Mention } from "../guards/Mention.guard";

function sendEmbed(command: CommandMessage, adjective?: string, footer?: string, mentions?: boolean) {
    const author = command.member.displayName;
    let user;
    if (mentions === false) {
        user = '';
    }
    else {
        const member = command.guild.member(command.mentions.users.first());
        if (member.nickname === null) {
            user = member.user.username;
        }
        else {
            user = member.nickname;
        }
    }
    const embed = new MessageEmbed()
        .setColor(COLOR.RANDOM)
        .setTitle(`${author} ${adjective} ${user}`)
        .setFooter(`${footer}`);
    command.reply(embed).then((messageSent) => {
        Logger.prototype.info(`Sent a ${adjective} : message id ${messageSent.id}`);
    });
}
export abstract class Fun {
    logger = Logger.prototype.getInstance();

    @Command("ping")
    @Description("Get latency of the bot")
    @Guard(NotBot)
    async ping(command: CommandMessage): Promise<void> {
        this.logger.info("Sending ping");
        const time = Date.now() - command.createdTimestamp;
        command.reply("Pong time is " + time).then((messageSent) => {
            this.logger.info(`Sent Ping : message id ${messageSent.id}`);
        });
    }

    @Command("dice")
    @Description("Roll a dice")
    @Guard(NotBot)
    async dice(command: CommandMessage): Promise<void> {
        this.logger.info("Sending dice");
        const diceRoll = Math.floor(Math.random() * 6) + 1;

        command.reply("You rolled a " + diceRoll).then((messageSent) => {
            this.logger.info(`Sent dice : message id ${messageSent.id}`);
        });
    }

    @Command("magic8")
    @Description("Get what the magic 8 ball says")
    @Guard(NotBot)
    async magic8(command: CommandMessage): Promise<void> {
        this.logger.info("Sending magic8");
        const options = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.",
            "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];

        const random = Math.floor(Math.random() * options.length);


        command.reply("The magic8 ball says " + options[random]).then((messageSent) => {
            this.logger.info(`Sent magic8 : message id ${messageSent.id}`);
        });
    }

    @Command("kill")
    @Description("Kill another user. Uh Oh")
    @Guard(NotBot, Mention)
    async kill(command: CommandMessage): Promise<void> {
        this.logger.info("Sending kill");
        const options = ["barbecued", "disintegrated", "360-no-scoped",
            "eaten alive", "yeeted out of existence", "squashed", "smited", "dropped in the void"];

        const random = Math.floor(Math.random() * options.length);

        sendEmbed(command, options[random], "K-O", true);
    }
}