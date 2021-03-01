import { Description, On, ArgsOf } from "@typeit/discord";
import { Role } from "discord.js";
import { ID } from "../enum/id.enum";
import { Logger } from "../logger/logger.service";

@Description("Discord Member Event Handlers")
export abstract class MemberEvents {
  logger = Logger.prototype.getInstance();

  /**
   * @name memberJoin
   * @param param member - member that has just joined the server
   * @description
   * When a user joins greet them and add the member role.
   */
  @On("guildMemberAdd")
  async memberJoin([member]: ArgsOf<"guildMemberAdd">): Promise<void> {
    this.logger.info(
      `User : ${member.user.username} has joined the Discord Server.`
    );
    const guild = member.guild;

    guild.systemChannel.send(`Hello ${member}! Welcome to the **Hackathon** Discord!`)

    guild.roles.fetch(ID.MEMBER_ID).then((role: Role) => {
      member.roles
        .add(role)
        .then((newMember) => {
          this.logger.info(`Role added to ${newMember.id}`);
        })
        .catch(() => {
          this.logger.error(`Failed to put member role on ${member.id}`);
        });
    });
  }
}