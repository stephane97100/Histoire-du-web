import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('dist/index.html', 'utf8');
const dom = new JSDOM(html, { 
  runScripts: "dangerously", 
  resources: "usable",
  url: "http://localhost/"
});

dom.window.addEventListener("error", (event) => {
  console.error("JSDOM ERROR:", event.error);
});
dom.window.addEventListener("unhandledrejection", (event) => {
  console.error("JSDOM PROMISE REJECTION:", event.reason);
});

// Polyfill fetch and others if needed
dom.window.fetch = async () => {};

const jsFile = fs.readdirSync('dist/assets').find(f => f.endsWith('.js'));
const jsCode = fs.readFileSync(path.join('dist/assets', jsFile), 'utf8');

const scriptEl = dom.window.document.createElement("script");
scriptEl.textContent = jsCode;
dom.window.document.body.appendChild(scriptEl);

setTimeout(() => {
  console.log("HTML:", dom.window.document.getElementById('root').innerHTML.substring(0, 500));
  process.exit(0);
}, 2000);
