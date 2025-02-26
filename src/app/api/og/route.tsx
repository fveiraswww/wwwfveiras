/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const title = searchParams.get("title");
  const username = searchParams.get("username");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "white",
          backgroundImage:
            "url('https://res.cloudinary.com/dsvav4t84/image/upload/v1729116569/andrew-kliatskyi-RJ7tsexUyJY-unsplash_frtjqk.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          padding: "20px",
          margin: "0px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter",
        }}
      >
        <h2 style={{ display: "flex", lineHeight: "1" }}>
          {title ? title : "Untitled"}
        </h2>
        <p
          style={{
            display: "flex",
            fontSize: "24px",
            lineHeight: "1",
            color: "gray",
          }}
        >
          @fveiras_
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: "30%",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
