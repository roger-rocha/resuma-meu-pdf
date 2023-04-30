import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Resuma seu PDF em segundos." />
          <meta
            property="og:site_name"
            content="https://resuma-meu-pdf.vercel.app/"
          />
          <meta
            property="og:description"
            content="Resuma qualquer PDF em segundos."
          />
          <meta property="og:title" content="Resuma qualquer PDF em segundos." />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Resuma qualquer PDF em segundos" />
          <meta
            name="twitter:description"
            content="Resuma qualquer PDF em segundos."
          />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/74687838/235357148-36c1d2ae-a0ee-4c69-9372-6128d20bab50.jpeg"
          />
          <meta
            name="twitter:image"
            content="https://user-images.githubusercontent.com/74687838/235357148-36c1d2ae-a0ee-4c69-9372-6128d20bab50.jpeg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
