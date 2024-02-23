/** @jsx jsx */
import {
  html,
  jsx,
  logger,
  poweredBy,
  serveStatic,
} from "https://deno.land/x/hono@v3.11.7/middleware.ts";
import { Hono } from "https://deno.land/x/hono@v3.11.7/mod.ts";

const app = new Hono();

app.use("*", logger(), poweredBy());
app.use("/public/*", serveStatic({ root: "./" }));

type Props = {
  title: string;
  children?: any;
};

const Layout = (props: Props) =>
  html`<!DOCTYPE html>
  <html>
    <head>
      <title>${props.title}</title>
      <link rel="icon" href="public/favicon.png">
      <style>
        @font-face {
          font-family: sn-pro;
          src: url(public/fonts/sn-pro/SNPro-Regular.woff2);
          font-weight: normal;
        }
        @font-face {
          font-family: sn-pro;
          src: url(public/fonts/sn-pro/SNPro-Bold.woff2);
          font-weight: bold;
        }
        body {
          font-family: sn-pro, sans;
          margin: 0;
          background: beige;
          font-size: 20px;
          body: 100%;
        }
        .title-banner {
          text-align: center;
          background-image: url("public/texture-1.png");
          background-color: rgb(113, 129, 125);
          width: 100%;
          margin: 0;
          padding-top: 200px;
          padding-bottom: 200px;
        }
        .title {
          width: 80%;
          max-width: 400px;
        }
        section h1 {
          font-family: monospace;
          padding-top: 20px;
          word-spacing: -0.2em;
        }
        section {
          margin: 0 auto 0 auto;
          padding-top: 40px;
          padding-bottom: 40px;
          padding-left: 20px;
          padding-right: 0px;
          max-width: 600px;
        }
        section p {
          line-height: 1.5;
        }
        h4 {
          text-decoration: underline solid gray;
          margin-bottom: 0;
        }
        input {
          margin: 10px;
        }
        .notify {
          margin: 0;
          margin-top: 100px;
          text-align: center;
          padding: 150px 10px 150px 10px;
          background-image: url("public/texture-4.png");
          background-color: rgb(220, 175, 175);
          background-size: 13%;
        }
        .tags {
          font-size: 0.8em;
          background-color: rgba(48, 43, 59, 0.9);
          color: rgba(256, 256, 256, 0.95);
          border-radius: 6px;
          padding: 3px;
        }
      </style>
    </head>
    <body>
      ${props.children}
    </body>
  </html>`;

app.get("/", (c) => {
  return c.html(
    <Layout title="Inro">
      <div class="title-banner">
        <img class="title" src="public/inro-title.png" />
      </div>
      <section>
        <h1>Remembering things is hard</h1>
        <p>The restaurant your friend recommended...</p>
        <p>The name of that friendly person from the gym...</p>
        <p>The lockbox code to get into your AirBnb...</p>
        <h1>How do you remember?</h1>
        <p>
          <h4>Do file it into your notes app?</h4>
        </p>
        <p>
          Do you actually take the time, and file that restaurant recommendation
          into your curated knowledge-base? Or......
        </p>
        <p>
          <h4>Do you use exactly 1 page of your notes app?</h4>
        </p>
        <p>
          You know. <strong>THAT</strong>{" "}
          page. That first page that pops up. That page filled with numbers,
          codes, names, and dates. Do you remember why you wrote those numbers?
          Do you even remember writing them at all?
        </p>
        <h1>Inro is the first page of your notes app, reinvented</h1>
        <p>
          Inro is made to handle all those haphazardly thrown bits and pieces of
          notes, and help you recall that information later. Think of it like
          texting yourself, but with all the powerful features you'd expect in a
          modern notes app, helping you find that information later:{" "}
          <span class="tags">#tags</span>, content-search, and filtering.
        </p>
      </section>
      <footer class="notify">
        <h2>Inro is in development.</h2>
        <h3>Be notified when it's available!</h3>

        <form
          action="https://buttondown.email/api/emails/embed-subscribe/inro"
          method="post"
          target="popupwindow"
          onsubmit="window.open('https://buttondown.email/inro', 'popupwindow')"
          class="embeddable-buttondown-form"
        >
          <label for="bd-email">Enter your email</label>
          <input type="email" name="email" id="bd-email" />
          <input type="submit" value="submit" />
        </form>
      </footer>
    </Layout>,
  );
});

Deno.serve(app.fetch);
