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
        body {
          font-family: monospace;
          margin: 0;
          background: beige;
          font-size: 1.2rem;
          line-height: 1.8rem;
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
          padding-top: 20px;
          padding-bottom: 20px;
        }
        section {
          margin: auto;
          padding-top: 80px;
          padding-bottom: 80px;
          padding-left: 20px;
          padding-right: 0px;
          max-width: 600px;
        }
        input {
          margin: 10px;
        }
        .notify {
          width: 100%;
          margin: 0;
          margin-top: 100px;
          text-align: center;
          padding-top: 150px;
          padding-bottom: 150px;
          background-image: url("public/texture-4.png");
          background-color: rgb(220, 175, 175);
          background-size: 13%;
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
        <p>The restaurant your friend told you about</p>
        <p>The name of that person you met at the gym</p>
        <p>The lockbox code to get into your AirBnb</p>
        <h1>When you need to remember something, where do you turn?</h1>
        <p>
          Do you write it in your knowledge-base? Your perfectly organized
          system, sorted into folders, and cross-refenced by tags?
        </p>
        <p>
          Or do you quickly jot it down on the first page of your notes app?
          You know the one: a mix of numbers, codes, names, and dates.
        </p>
        <p>Do you remember what they were for?</p>
        <p>Do you even remember when you wrote them?</p>
        <h1>Inro is the first page of your notes app, reinvented</h1>
        <p>
          Inro is made to handle all your haphazardly thrown bits and pieces of
          notes, and help you recall that information later. You can think of
          it like texting yourself, but with all the powerful features you'd
          expect in a notes app: things like tags, content-search, and filtering.
        </p>
      </section>
      <footer class="notify">
        <h2>Inro is currently in development.</h2>
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
          <input type="submit" value="Done!" />
        </form>
      </footer>
    </Layout>,
  );
});

Deno.serve(app.fetch);
