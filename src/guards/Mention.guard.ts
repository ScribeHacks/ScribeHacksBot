import { GuardFunction } from "@typeit/discord";
import { Logger } from "../services/logger.service";

export const Mention: GuardFunction<"message"> = async (
    [message],
    client,
    next,
) => {
    const logger = Logger.prototype.getInstance();
    if (message.mentions.users.first() !== null) {
        await next();
    }
    else {
        logger.warn("user didn't mention");
    }
};