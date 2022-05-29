import { ChannelCredentials } from "@grpc/grpc-js";
import { EchoClient } from "./generated/echo.grpc-client";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  // path: `.env.${process.env.NODE_ENV || "development"}`,
  path: ".env",
});

const client = new EchoClient("localhost:5000", ChannelCredentials.createInsecure(), {}, {});
// client.unaryEcho(
//   {
//     message: "test",
//   },
//   (err, value) => {
//     console.log(`UnaryEcho: ${value?.message}`);
//   },
// );

const call = client.bidirectionalStreamingEcho();

call.on("data", arg1 => {
  console.log(`received message: ${arg1.message}`);
});

call.write({
  message: "hello",
});

call.write({
  message: "world",
});

call.write({
  message: "closed",
});

// call.cancel();

// call.end();
