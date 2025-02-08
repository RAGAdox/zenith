import {
  purgeScheduleMessage,
  retriveScheduledMessage,
  storeScheduleMessage,
} from "@/app/services/message-storage";
import { cancelMessage, scheduleMessage } from "@/app/services/schedule";
import {
  purgeAccessToken,
  storeAccessToken,
} from "@/app/services/token-storage";
import { IToken } from "@/types";

export default async function tokenStorageWorkflow(token: IToken) {
  const scheduleURL = `${process.env.FUNCTION_BASE_URL}/refresh`;

  await purgeAccessToken();
  await storeAccessToken(token);

  const previousScheduleMessage = await retriveScheduledMessage(scheduleURL);

  if (previousScheduleMessage) {
    await cancelMessage(previousScheduleMessage.messageId as string);
    await purgeScheduleMessage(scheduleURL);
  }

  const scheduleResponse = await scheduleMessage({ url: scheduleURL });

  await storeScheduleMessage(scheduleResponse.messageId, scheduleURL);
}
