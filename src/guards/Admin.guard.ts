import { GuardFunction } from "@typeit/discord";
import { Logger } from "../services/logger.service";

export const Admin: GuardFunction<"message"> = async (
    [message],
    client,
    next,
) => {
    const logger = Logger.prototype.getInstance();
    if (message.member.permissions.has('ADMINISTRATOR')) {
        logger.info(`${message.content} : ${message.author.id} : is admin.`);
        await next();
    }
};