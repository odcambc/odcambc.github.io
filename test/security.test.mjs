import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { JSDOM, VirtualConsole } from "jsdom";

const require = createRequire(import.meta.url);
const prism = require("../assets/js/distillpub/prism.js");
const asset = (name) => readFileSync(new URL(`../assets/js/distillpub/${name}`, import.meta.url), "utf8");

function runtime() {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => {
    // jsdom cannot parse some existing Distill print CSS. No layout is tested here.
    if (error.type !== "css parsing") throw error;
  });
  const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    url: "https://example.com/",
    virtualConsole,
  });
  dom.window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  dom.window.IntersectionObserverEntry = class {};
  dom.window.eval(asset("prism.js"));
  dom.window.eval(asset("template.v2.js"));
  return dom;
}

test("grammar expansion cannot change prototypes or copy inherited tokens", () => {
  const rest = JSON.parse('{"__proto__":{"polluted":true},"constructor":{},"prototype":{}}');
  Object.setPrototypeOf(rest, { inheritedToken: /bad/ });
  const grammar = { rest };
  const prototype = Object.getPrototypeOf(grammar);
  assert.deepEqual(prism.tokenize("safe", grammar), ["safe"]);
  assert.equal(Object.getPrototypeOf(grammar), prototype);
  assert.equal(grammar.polluted, undefined);
  assert.equal(Object.hasOwn(grammar, "__proto__"), false);
  assert.equal(Object.hasOwn(grammar, "constructor"), false);
  assert.equal(Object.hasOwn(grammar, "prototype"), false);
  assert.equal(Object.hasOwn(grammar, "inheritedToken"), false);
});

test("all previously supported languages still highlight and escape HTML", () => {
  for (const language of ["markup", "css", "clike", "javascript", "python", "lua", "bash", "go", "markdown", "julia"]) {
    assert.ok(prism.languages[language], language);
    const html = prism.highlight('<img src=x onerror="alert(1)">', prism.languages[language], language);
    const dom = new JSDOM(html);
    assert.equal(dom.window.document.querySelector("img"), null, language);
    dom.window.close();
  }
});

test("malformed markup and JavaScript complete within a bounded process", () => {
  const script = `
    const prism = require(${JSON.stringify(require.resolve("../assets/js/distillpub/prism.js"))});
    const inputs = [
      ['markup', '<!doctype![<!--' + '--><!--'.repeat(1000)],
      ['markup', '<style>' + '<![CDATA[]]>'.repeat(1000)],
      ['markup', '<style><![cdata[' + ']]><![cdata['.repeat(1000)],
      ['javascript', '/a/' + '*//*'.repeat(1000)]
    ];
    for (const [language, input] of inputs) prism.highlight(input, prism.languages[language], language);
  `;
  execFileSync(process.execPath, ["-e", script], { timeout: 3000 });
});

test("table of contents treats heading text and IDs as data", () => {
  const dom = runtime();
  try {
    const { document } = dom.window;
    const article = document.createElement("d-article");
    const heading = document.createElement("h2");
    heading.id = 'heading" onclick="alert(1)';
    heading.textContent = '<img src=x onerror="alert(1)">';
    article.appendChild(heading);
    const toc = document.createElement("d-toc");
    document.body.append(article, toc);
    dom.window.onload();
    const link = toc.querySelector("a");
    assert.equal(link.textContent, heading.textContent);
    assert.equal(link.getAttribute("href"), "#" + heading.id);
    assert.equal(toc.querySelector("img, [onclick], [onerror]"), null);
  } finally {
    dom.window.close();
  }
});

test("block code removes only its leading newline and preserves later lines", () => {
  const dom = runtime();
  try {
    const code = dom.window.document.createElement("d-code");
    code.setAttribute("language", "javascript");
    code.setAttribute("block", "");
    code.textContent = '\n  const x = "<img src=x>";\n  console.log(x);\n';
    dom.window.document.body.appendChild(code);
    code.renderContent();
    const rendered = code.shadowRoot.querySelector("#code-container");
    assert.equal(rendered.textContent, 'const x = "<img src=x>";\nconsole.log(x);');
    assert.equal(rendered.querySelector("img"), null);
  } finally {
    dom.window.close();
  }
});

test("Distill transforms retain the local runtime without remote reinjection", () => {
  const source = asset("transforms.v2.js");
  const start = source.indexOf("  function render(dom) {");
  const end = source.indexOf("  // Copyright", start);
  assert.ok(start !== -1 && end > start);
  const transform = source.slice(start, end);
  const dom = new JSDOM('<!doctype html><html><head><script src="/assets/js/distillpub/template.v2.js"></script></head><body></body></html>', {
    runScripts: "outside-only",
  });
  try {
    const original = dom.window.document.querySelector("script");
    dom.window.eval(`(${transform})(document)`);
    assert.equal(dom.window.document.querySelector("script"), original);
    assert.equal(dom.window.document.querySelectorAll("script").length, 1);
    assert.equal(source.includes("https://distill.pub/template.v2.js"), false);
  } finally {
    dom.window.close();
  }
});
