import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { rword } from 'rword';
import { Admin } from "../guards/Admin.guard";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";

interface randomWordArgs {
    randomWords: number;
}

export abstract class Pods {

    logger = Logger.prototype.getInstance();

    /**
     * @name pods
     * @param command
     * object is command message from the author.
     * @description
     * Creates "pods" channels for every team and assigns a mentor to the channel.
     */
    @Command("podsAdd :randomWords")
    @Description("Creates pods channels for every team and assigns a mentor to the channel")
    @Guard(NotBot, Admin)
    async podsAdd(command: CommandMessage<randomWordArgs>): Promise<void> {

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
                    reason: 'Added a new pod role',
                })
            })
        }

        command.reply("Executed the command!").then((messageSent) => {
            this.logger.info(`Sent Info : message id ${messageSent.id}`);
        });
    }

    @Command("podsRemove")
    @Description("Creates pods channels for every team and assigns a mentor to the channel")
    @Guard(NotBot, Admin)
    async podsRemove(command: CommandMessage): Promise<void> {
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
}
