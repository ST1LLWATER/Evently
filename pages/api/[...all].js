// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const BACKEND = process.env.BACKEND || "http://localhost:4000";
const httpProxyMiddleware = require("next-http-proxy-middleware");

export default function handler(req, res) {
  httpProxyMiddleware.default(req, res, {
    // You can use the `http-proxy` option
    target: BACKEND,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
    // pathRewrite: [{
    //   patternStr: '^/api/new',
    //   replaceStr: '/v2'
    // }, {
    //   patternStr: '^/api',
    //   replaceStr: ''
    // }],
  });
}
