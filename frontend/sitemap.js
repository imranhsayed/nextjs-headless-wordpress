const sitemap = require("nextjs-sitemap-generator");
const fs = require("fs");

const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();

sitemap({
    baseUrl: process.env.NEXT_PUBLIC_NEXTJS_SITE_URL,
    pagesDirectory: __dirname + "/.next/server/pages",
    targetDirectory: "public/",
    ignoredExtensions: ["js", "map"],
    ignoredPaths: ["[...slug]"],
    nextConfigPath: __dirname + "/next.config.js",
    sitemapStylesheet: [
        {
            type: "text/xsl",
            styleFile: "/sitemap.xsl"
        }
    ]
});

console.log(`✅ sitemap.xml generated!`);
