import getCurrentSong from "@/app/services/songs/getCurrentSong";
import { retriveAccessToken } from "@/app/services/token-storage";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import { ISpotifyTrackDetails } from "@/types";
import * as _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const token = await retriveAccessToken();
    if (!token) {
      throwHttpErrors("NO_TOKEN");
    }

    const encoder = new TextEncoder();
    let setSongInterval: NodeJS.Timeout;
    let oldSongData:
      | ISpotifyTrackDetails
      | undefined
      | { resource: string; error: string; success: boolean };
    let notPlayingCount = 0;

    const stream = new ReadableStream({
      async start(controller) {
        setSongInterval = setInterval(async () => {
          const currentSong = await getCurrentSong(token!.accessToken);
          if (currentSong) {
            if (!_.isEqual(currentSong, oldSongData)) {
              oldSongData = currentSong;
              const event =
                "data: " +
                JSON.stringify({
                  resource: "CURRENT_SONG",
                  value: currentSong,
                  success: true,
                }) +
                "\n\n";
              controller.enqueue(encoder.encode(event));
            }
          } else {
            const responseData = {
              resource: "CURRENT_SONG",
              error: "NOT_PLAYING",
              success: false,
            };
            if (!_.isEqual(responseData, oldSongData) || notPlayingCount > 10) {
              notPlayingCount = 0;
              oldSongData = responseData;
              const event = "data: " + JSON.stringify(responseData) + "\n\n";
              controller.enqueue(encoder.encode(event));
            } else {
              notPlayingCount++;
            }
          }
        }, 1000);

        request.signal.onabort = () => {
          console.log("Request signal abort");
          clearInterval(setSongInterval);
          controller.close();
        };
      },
    });

    return new NextResponse(stream, {
      headers: {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error: any) {
    return catchHttpErrors(error);
  }
}
