import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { env } from "@/config/env";

import { loadGoogleFont } from "@/services/google-fonts/load";

import { getSongBySlug } from "@/utils/get-song-by-slug";

export const contentType = "image/jpg";
export const size = { width: 1200, height: 630 };

type Params = {
  slug: string;
};

type Props = {
  params: Promise<Params>;
};

export const GET = async (_: NextRequest, { params }: Props) => {
  const { slug } = await params;

  const song = getSongBySlug({ slug });

  if (!song) {
    const text = "Song not found";

    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "#171717",
          color: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text}
      </div>,
      {
        width: size.width,
        height: size.height,
        fonts: [
          {
            name: "Poppins",
            weight: 400,
            style: "normal",
            data: await loadGoogleFont({
              font: "Poppins",
              weight: 400,
              text: text,
            }),
          },
        ],
      },
    );
  }

  const { name, band, thumbnailUrl } = song;

  const absoluteThumbnailUrl = `${env.appUrl}${thumbnailUrl}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        overflow: "hidden",
        background: "#171717",
      }}
    >
      <BlurredBackground thumbnailUrl={absoluteThumbnailUrl} {...size} />

      <Overlay {...size} />

      <ImageBuilder
        songName={name}
        bandName={band.name}
        thumbnailUrl={absoluteThumbnailUrl}
      />
    </div>,
    {
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: "Poppins",
          weight: 600,
          style: "normal",
          data: await loadGoogleFont({
            font: "Poppins",
            weight: 600,
            text: name,
          }),
        },
        {
          name: "Poppins",
          weight: 400,
          style: "normal",
          data: await loadGoogleFont({
            font: "Poppins",
            weight: 400,
            text: band.name,
          }),
        },
      ],
    },
  );
};

type OverlayProps = {
  width: number;
  height: number;
};

function Overlay({ width, height }: OverlayProps) {
  return (
    <div
      tw={`absolute inset-0 w-[${width}px] h-[${height}px]`}
      style={{
        background:
          "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
      }}
    />
  );
}

type BlurredBackgroundProps = {
  width: number;
  height: number;
  thumbnailUrl: string;
};

function BlurredBackground({
  width,
  height,
  thumbnailUrl,
}: BlurredBackgroundProps) {
  return (
    <div
      tw={`absolute inset-0 w-[${width}px] h-[${height}px] opacity-35`}
      style={{
        backgroundImage: `url(${thumbnailUrl})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "blur(25px)",
      }}
    />
  );
}

type ImageBuilderProps = {
  songName: string;
  bandName: string;
  thumbnailUrl: string;
};

function ImageBuilder({ songName, bandName, thumbnailUrl }: ImageBuilderProps) {
  return (
    <div tw="flex items-center p-[60px]">
      {/** biome-ignore lint/performance/noImgElement: The song thumbnail must be an image tag. */}
      <img
        src={thumbnailUrl}
        width={380}
        height={380}
        alt=""
        tw="rounded-xl"
        style={{
          objectFit: "cover",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      />

      <div tw="flex flex-col ml-10">
        <h1
          tw="text-white font-semibold text-[62px] m-0 leading-none max-w-[660px]"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
        >
          {songName}
        </h1>

        <p
          tw="text-white/48 font-normal leading-tight text-4xl m-0 mt-4"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          {bandName}
        </p>
      </div>
    </div>
  );
}
