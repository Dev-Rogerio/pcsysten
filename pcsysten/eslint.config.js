[build];
base = "client";
publish = "client/build";
command = "CI=false npm run build"[functions];
directory = "client/netlify/functions"[context.production.environment];
NODE_ENV = "production";
