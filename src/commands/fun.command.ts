import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import NekoClient = require("nekos.life");
import { COLOR } from "../enum/colors.enum";
import { MessageEmbed } from "discord.js";
import { Mention } from "../guards/Mention.guard";

function getMentioned(command: CommandMessage) {
    try {
        const myMentioned = command.mentions.users.first();
        const guildMentioned = command.guild.member(myMentioned);
        const mentioned = guildMentioned ? guildMentioned.nickname : guildMentioned.user.username;
        if (mentioned === null) {
            return "error";
        }
        else {
            return mentioned;
        }
    } catch (error) {
        Logger.prototype.error("Undefined user");
        return "error";
    }
}

function sendEmbed(command: CommandMessage, adjective?: string, footer?: string, url?: string, mentions?: boolean) {
    const author = command.member.displayName;
    let user;
    if (mentions === false) {
        user = '';
    }
    else {
        user = getMentioned(command);
    }
    const embed = new MessageEmbed()
        .setColor(COLOR.RANDOM)
        .setTitle(`${author} ${adjective} ${user}`)
        .setImage(url)
        .setFooter(`${footer}`);
    if (user == "error") { return; }
    else {
        command.reply(embed).then((messageSent) => {
            Logger.prototype.info(`Sent a ${adjective} : message id ${messageSent.id}`);
        });
    }
}
export abstract class Fun {
    logger = Logger.prototype.getInstance();
    neko = new NekoClient();
    api = "https://purrbot.site/api";

    @Command("kiss")
    @Description("Sends a kiss to another user. Must @ another user.")
    @Guard(NotBot)
    async kiss(command: CommandMessage): Promise<void> {
        sendEmbed(command, "kisses", "You both look cute", await (await this.neko.sfw.kiss()).url);
    }

    @Command("smug")
    @Description("Be smug")
    @Guard(NotBot)
    async smug(command: CommandMessage): Promise<void> {
        sendEmbed(command, "is smug", "You look smug", await (await this.neko.sfw.smug()).url, false);
    }

    @Command("baka")
    @Description("You are a baka")
    @Guard(NotBot)
    async baka(command: CommandMessage): Promise<void> {
        sendEmbed(command, "is baka", "You look baka", await (await this.neko.sfw.baka()).url, false);
    }

    @Command("pat")
    @Description("Pat another user. Must @ another user")
    @Guard(NotBot, Mention)
    async pat(command: CommandMessage): Promise<void> {
        sendEmbed(command, "patted", "You did a good pat", await (await this.neko.sfw.pat()).url);
    }

    @Command("hug")
    @Description("Hug another user. Must @ another user")
    @Guard(NotBot, Mention)
    async hug(command: CommandMessage): Promise<void> {
        sendEmbed(command, "hugged", "You gave a massive hug", await (await this.neko.sfw.hug()).url);
    }

    @Command("slap")
    @Description("Slap another user. Must @ another user")
    @Guard(NotBot, Mention)
    async slap(command: CommandMessage): Promise<void> {
        sendEmbed(command, "slapped", "You slapped them hard", await (await this.neko.sfw.slap()).url);
    }

    @Command("tickle")
    @Description("Tickle another user. Must @ another user")
    @Guard(NotBot, Mention)
    async tickle(command: CommandMessage): Promise<void> {
        sendEmbed(command, "tickled", "You tickled them hard", await (await this.neko.sfw.tickle()).url);
    }

    @Command("cuddle")
    @Description("Cuddle another user. Must @ another user")
    @Guard(NotBot, Mention)
    async cuddle(command: CommandMessage): Promise<void> {
        sendEmbed(command, "cuddled", "You cuddled them hard", await (await this.neko.sfw.cuddle()).url);
    }
    @Command("poke")
    @Description("Poke another user. Must @ another user")
    @Guard(NotBot, Mention)
    async poke(command: CommandMessage): Promise<void> {
        sendEmbed(command, "poked", "You poked them hard", await (await this.neko.sfw.poke()).url);
    }

    @Command("feed")
    @Description("Feed another user. Must @ another user")
    @Guard(NotBot, Mention)
    async feed(command: CommandMessage): Promise<void> {
        sendEmbed(command, "fed", "You fed them good food", await (await this.neko.sfw.feed()).url);
    }

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
        const member = await command.guild.member(command.author);
        const author = member ? member.nickname : command.author.username;
        const user = getMentioned(command);

        const random = Math.floor(Math.random() * options.length);

        const embed = new MessageEmbed()
            .setColor(COLOR.RANDOM)
            .setTitle(`${author} was ${options[random]} by ${user}`)
            .setFooter("K-O!");

        if (user == "error") { return; }
        else {

            command.reply(embed).then((messageSent) => {
                this.logger.info(`Sent kill : message id ${messageSent.id}`);
            });
        }
    }
}