import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { rword } from 'rword';
import { Admin } from "../guards/Admin.guard";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

interface randomWordArgs {
    randomWords: number;
}

export abstract class Teams {

    logger = Logger.prototype.getInstance();

    /**
     * @name Teams
     * @param command
     * object is command message from the author.
     * @description
     * Creates "teams" channels for every team and assigns a mentor to the channel.
     */
    @Command("teamsAdd :randomWords")
    @Description("Creates teams channels for every team and assigns a mentor to the channel")
    @Guard(NotBot, Admin)
    async teamsAdd(command: CommandMessage<randomWordArgs>): Promise<void> {

        const { randomWords } = command.args;

        if (randomWords > 2) {

            const wordsBad = rword.generate(randomWords);
            const words = <string[]>wordsBad;
            this.logger.info(words.toString());

            words.forEach(function (word) {
                command.guild.roles.create({
                    data: {
                        name: "Team: " + word,
                        color: 'BLUE',
                    },
                    reason: 'Added a new team role',
                })
            })
        }

        command.reply("Executed the command!").then((messageSent) => {
            this.logger.info(`Sent Info : message id ${messageSent.id}`);
        });
    }

    @Command("teamsRemove")
    @Description("Creates teams channels for every team and assigns a mentor to the channel")
    @Guard(NotBot, Admin)
    async teamsRemove(command: CommandMessage): Promise<void> {
        const allRoles = command.guild.roles.cache;
        const rolesToBeDeleted = Array<string>();
        allRoles.forEach(role => {
            if (role.name != 'Organizer' && role.name != 'Hacker' && role.name != 'ScribeHacksBot' && role.name != '@everyone') {
                role.delete();
                rolesToBeDeleted.push(role.name);
            }
        })
        this.logger.info("Removed: " + rolesToBeDeleted.toString());
    }

    @Command("createTeam")
    @Description("Makes a team for the current user's team")
    @Guard(NotBot)
    async createTeam(command: CommandMessage): Promise<void> {
        if (!command.guild.channels.cache.find(c => c.name === "Category" && c.type === 'category')) {
            command.guild.channels.create('CATEGORY', { type: 'category' }).then(cat => {
                command.guild.channels.create('Channel', { type: 'text', parent: cat.id });
                command.guild.channels.create('Voice', { type: 'voice', parent: cat.id });
            });
        }
    }
}