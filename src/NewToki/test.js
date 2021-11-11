const vm = require("vm");
const fs = require("fs");
const data = fs.readFileSync("./test").toString();

const sandbox = {
  html_data: "",
  out: "",
};

const context = vm.createContext(sandbox);

const htmlData = data.match(/( *html_data *\+?= *'([A-Z0-9]{2}\.)+';? *\n?)+/)[0];
let script = data.match(/unescape\('(%[A-Z0-9]{2})+'\)/)[0];
vm.runInContext(`out = ${script}`, context);
script = context.out;
script = script.substr(0, script.lastIndexOf("<"));
script = script.substr(script.lastIndexOf(">") + 1);
script = script.replace(/document\..*=/, "return ");
const funcName = script.match(/function +(.*?)\(/)[1];

vm.runInContext(htmlData, context);
vm.runInContext(script, context);
vm.runInContext(`out = ${funcName}(html_data)`, context);

console.log(context.out);

console.log(eval("1 + 1"));

//   const sandbox = {
//     html_data: "",
//     out: "",
//   };

//   const context = vm.createContext(sandbox);

//   const htmlData = data.match(/( *html_data *\+?= *'([A-Z0-9]{2}\.)+';? *\n?)+/)[0];
//   let script = data.match(/unescape\('(%[A-Z0-9]{2})+'\)/)[0];

//   script = vm.runInNewContext(`"Hi"`, context);
//   throw Error(script);
//   vm.runInContext(`out = ${script};`, context);
//   throw Error("Fuck");

//   script = sandbox.out;
//   script = script.substr(0, script.lastIndexOf("<"));
//   script = script.substr(script.lastIndexOf(">") + 1);
//   script = script.replace(/document\..*=/, "return ");
//   script = script.replace(/document\..*\((.*)\)/, "return $1");
//   const funcName = script.match(/function +(.*?)\(/)[1];

//   vm.runInContext(htmlData ?? "", context);
//   vm.runInContext(script ?? "", context);
//   vm.runInContext(`out = ${funcName}(html_data)`, sandbox);

//   const $ = cheerio.load(sandbox.out);

//   pages = $("img")
//     .toArray()
//     .map((page) => $(page).get(0).attribs)
//     .map((attribs) => attribs[
//       Object.keys(attribs).filter((attrib) => attrib.startsWith("data-"))[0]
//     ]);
