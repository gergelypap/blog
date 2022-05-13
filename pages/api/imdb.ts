import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(process.env.IMDB_LIST as string, {
    headers: {
      "Access-Control-Allow-Origin": process.env.APP_URL as string,
      "Accept-Language": "en",
    },
  });
  const text = await response.text();

  const $ = cheerio.load(text);
  const movies = $(".lister-item")
    .slice(0, 5)
    .map((i, el) => {
      const $el = $(el);

      return {
        url: "https://imdb.com" + ($el.find(".lister-item-header > a").attr("href") as string).split("?")[0],
        title: $el.find(".lister-item-header > a").text(),
        year: Number(($el.find(".lister-item-year").text().match(/\d{4}/) as string[])[0]),
        runtime: $el.find(".runtime").text(),
        genre: $el.find(".genre").text().trim(),
        plot: $el.find(".lister-item-content > p:nth-of-type(2)").text().trim(),
        rating: Number($el.find(".ipl-rating-widget > .ipl-rating-star > .ipl-rating-star__rating").text()),
        poster: $el.find(".lister-item-image img").attr("loadlate"),
      };
    });

  return res.status(200).json(movies.toArray());
}
