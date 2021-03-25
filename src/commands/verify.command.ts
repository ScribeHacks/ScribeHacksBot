import { Command, CommandMessage, Guard, Description } from "@typeit/discord";
import { NotBot } from "../guards/NotABot.guard";
import { Logger } from "../services/logger.service";
import { ID } from "../enum/id.enum";
import { HACKATHON } from "../enum/hackathon.enum"
import { TextChannel } from "discord.js";

interface verifyIn {
    verifyArgsString: string;
}
export abstract class Verify {

    logger = Logger.prototype.getInstance();

    @Command("verify :verifyArgsString")
    @Description("Verifies the user if the type !verify HackathonName")
    @Guard(NotBot)
    async verify(command: CommandMessage<verifyIn>): Promise<void> {
        const { verifyArgsString } = command.args;
        this.logger.info("Sending verify");

        const channel = command.channel as TextChannel;

        channel.bulkDelete(99).then(() => { command.channel.send("Please type in !verify and the name of the Hackathon") });

        const member_role = command.member.roles.cache.find(role => role.name === "Attendee");

        if (command.channel.id == ID.VERIFY_CHANNEL_ID && command.member.roles.cache.has(ID.MEMBER_ID) == false) {
            if (verifyArgsString.toLowerCase === HACKATHON.Name.toLowerCase) {
                command.member.roles.add(member_role);
            }
            else {
                command.author.send("Please type in: !verify and the name of the Hackathon");
            }
        }
    }
}