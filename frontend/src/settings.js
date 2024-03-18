import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "988d77dd73ca4b688953fd29db7c06a2"
const token = "007eJxTYLhaNVPsiVd3ccurAwwBCT3L2aRWaZlYr0n25Ha2tBI6vVKBwdLCIsXcPCXF3Dg50STJzMLC0tQ4LcXIMiXJPNnALNHoCKdfakMgI0OT1VxWRgYIBPHZGPJSyxMLChgYAM8dHXE="
export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "newapp";