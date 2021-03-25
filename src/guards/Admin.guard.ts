import { GuardFunction } from "@typeit/discord";
import { ID } from "../enum/id.enum";
import { Logger } from "../services/logger.service";

export const Admin: GuardFunction<"message"> = async (
    [message],
    client,
    next,
) => {
    const logger = Logger.prototype.getInstance();
    const role = message.guild.roles.cache.get(ID.ADMIN_ID);

    if (message.member.roles.cache.has(role.id)) {
        logger.info(`${message.content} : ${message.author.id} : is admin.`);
        await next();
    }
};