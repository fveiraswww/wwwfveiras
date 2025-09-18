import { basehub } from 'basehub'
import sharp from 'sharp'

export const revalidate = 60

export const GET = async () => {
  const data = await basehub().query({
    index: {
      avatar: {
        url: {
          __args: {
            width: 50,
            height: 50,
            format: 'png',
          },
        },
      },
    },
  })
  const iconURL = data.index.avatar.url

  const res = await fetch(iconURL)
  // make it round with sharp
  const buffer = await sharp(await res.arrayBuffer())
    .resize(50, 50)
    .composite([
      {
        input: Buffer.from(
          `<svg><circle cx="25" cy="25" r="25" fill="white"/></svg>`
        ),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()

  return new Response(buffer as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
