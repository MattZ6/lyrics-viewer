type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type Input = {
  font: 'Poppins'
  weight: Weight
  text: string
}

export async function loadGoogleFont({ font, weight, text }: Input) {
  const encodedText = encodeURIComponent(text)

  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodedText}`;

  const response = await fetch(url)
  const css = await response.text();

  const fontResourceUrlMatcher = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (fontResourceUrlMatcher) {
    const fontResourceResponse = await fetch(fontResourceUrlMatcher[1]);

    if (fontResourceResponse.status === 200) {
      return fontResourceResponse.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}
