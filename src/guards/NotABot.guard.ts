import { GuardFunction } from "@typeit/discord";
import { Logger } from "../services/logger.service";

export const NotBot: GuardFunction<"message"> = async (
  [message],
  client,
  next,
  nextObj
) => {
  const logger = Logger.prototype.getInstance();
  if (!message.author.bot) {
    logger.info(`${message.content} : ${message.author.id} : not a bot.`);
    await next();
  }
};
