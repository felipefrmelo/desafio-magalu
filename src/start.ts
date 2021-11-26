import server from "./entrypoint/app";

(async () => {
  const app = await server.init();
  app.listen(8080, () => {
    console.log("Server started on port ", 8080);
  });
})();
