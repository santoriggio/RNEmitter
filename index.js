import A from "./dist/index.js";

const Emitter = new A({
  once,
  delay
});

Emitter.add("test", (params) => {
  console.log(JSON.stringify(params));
});

Emitter.emit("test", { title: "ocicoi" });
