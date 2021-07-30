const{createServer:createServer}=require("http");function checkMethod(e){if(!["GET","POST","PUT","DELETE","PATCH"].includes(e))throw new Error("invalid method")}function checkPath(e){if("string"!=typeof e){if(!(e instanceof RegExp))throw new Error("path must be string or RegExp");if(!e.source.startsWith("^\\/")||!e.source.endsWith("$"))throw new Error("path must start with ^/ and ends with $")}else if(!e.startsWith("/"))throw new Error("path must start with /")}class RegexRouter{constructor(){this.routes=new Map,this.middlewares=[],this.notFoundHandler=((e,t)=>{t.statusCode=404,t.end(JSON.stringify({error:"Not found"}))}),this.internalErrorHandler=((t,r)=>{r.statusCode=500,r.end(JSON.stringify({error:e.message}))})}use(e){this.middlewares.push(e),this.notFoundHandler=e(this.notFoundHandler),this.internalErrorHandler=e(this.internalErrorHandler)}register(e,t,r,...s){checkMethod(e),checkPath(t),r=s.reduce((e,t)=>t(e),r),r=this.middlewares.reduce((e,t)=>t(e),r),this.routes.has(e)?this.routes.get(e).set(t,r):this.routes.set(e,new Map([[t,r]]))}handle(e,t){if(!this.routes.has(e.method))return void this.notFoundHandler(e,t);const r=[...this.routes.get(e.method).entries()].find(([t,r])=>"string"==typeof t?t===e.url:t.test(e.url));if(void 0===r)return void this.notFoundHandler(e,t);const[s,o]=r;try{s instanceof RegExp&&(e.matches=s.exec(e.url).groups),o(e,t)}catch(r){this.internalErrorHandler(e,t)}}}const cors=e=>(t,r)=>{if(!t.headers.origin)return void e(t,r);const s={"access-control-allow-origin":"*"};if("OPTIONS"!==t.method){Object.entries(s).forEach(([e,t])=>r.setHeader(e,t));try{return void e(t,r)}catch(e){throw e.headers={...e.headers,...s},e}}t.headers["access-control-request-method"]&&(Object.entries({...s,"access-control-allow-methods":"GET, POST, PUT, DELETE, PATCH"}).forEach(([e,t])=>r.setHeader(e,t)),t.headers["access-control-request-headers"]&&r.setHeader("access-control-allow-headers",t.headers["access-control-request-headers"]),r.statusCode=204,r.end())},slow=e=>(t,r)=>{setTimeout(()=>{e(t,r)},5e3)},log=e=>(t,r)=>{console.info(`incoming request: ${t.method} ${t.url}`),e(t,r)},json=e=>(t,r)=>{const s=[];t.on("data",e=>{s.push(e)}),t.on("end",()=>{try{t.body=JSON.parse(Buffer.concat(s).toString())}catch(e){return r.statusCode=500,void r.end(JSON.stringify({error:"invalid json"}))}console.info(t.body),e(t,r)})},router=new RegexRouter;router.use(log),router.use(cors),router.register("GET","/",(e,t)=>{t.setHeader("Content-Type","application/json"),t.end(JSON.stringify({status:"ok"}))}),router.register("POST","/api/lection/cards",(e,t)=>{t.setHeader("Content-Type","application/json"),t.end(JSON.stringify({status:"ok"}))},json),router.register("GET","/api/hw13",(e,t)=>{t.setHeader("Content-Type","application/json"),t.end(JSON.stringify({date:"27 июля",usd:{buyRate:"73,75",sellRate:"75,24"},eur:{buyRate:"86,70",sellRate:"88,74"}}))}),router.register("POST","/api/hw14",(e,t)=>{const r=Object.getOwnPropertyNames(e.body);if(1!==r.length||"phone"!==r[0])return t.statusCode=500,t.setHeader("Content-Type","application/json"),void t.end(JSON.stringify({error:"object must contain only one property: phone"}));const{phone:s}=e.body;return"+77777777777"===s.trim()?(t.statusCode=400,t.setHeader("Content-Type","application/json"),void t.end(JSON.stringify({status:"error",error:"Номер заблокирован"}))):"+88888888888"===s.trim()?(t.statusCode=400,t.setHeader("Content-Type","application/json"),void t.end(JSON.stringify({status:"error",error:"Неверный формат номера"}))):(t.setHeader("Content-Type","application/json"),void t.end(JSON.stringify({status:"ok",error:null})))},json);const server=createServer((e,t)=>router.handle(e,t)),port=process.argv[2]||9999;server.listen(port,()=>{console.info(`server started at http://127.0.0.0.1:${port}`)});