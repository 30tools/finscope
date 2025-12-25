import { onRequestPost as __api_trigger_indexnow_js_onRequestPost } from "/Users/shaswatraj/Desktop/earn/30tool apps/finscope/functions/api/trigger-indexnow.js"

export const routes = [
    {
      routePath: "/api/trigger-indexnow",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_trigger_indexnow_js_onRequestPost],
    },
  ]