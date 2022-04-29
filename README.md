# GorevYoneticisi
Quick Start#
Depending on your use case and preference, you can use Vue with or without a build step.

With Build Tools#
A build setup allows us to use Vue Single-File Components (SFCs). The official Vue build setup is based on Vite, a frontend build tool that is modern, lightweight and extremely fast.

Online#
You can try Vue with SFCs online on StackBlitz. StackBlitz runs the Vite-based build setup directly in the browser, so it is almost identical to the local setup but doesn't require installing anything on your machine.

Local#
Pre-requisites

Familiarity with the command line
Install Node.js
To create a build-tool-enabled Vue project on your machine, run the following command in your command line (without the > sign):

> npm init vue@latest
This command will install and execute create-vue, the official Vue project scaffolding tool. You will be presented with prompts for a number of optional features such as TypeScript and testing support:

✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
If you are unsure about an option, simply choose No by hitting enter for now. Once the project is created, follow the instructions to install dependencies and start the dev server:

> cd <your-project-name>
> npm install
> npm run dev
You should now have your first Vue project running! Here are some additional tips:

The recommended IDE setup is Visual Studio Code + Volar extension. WebStorm is also viable.
More tooling details, including integration with backend frameworks, are discussed in the Tooling Guide.
To learn more about the underlying build tool Vite, check out the Vite docs.
If you chose to use TypeScript, check out the TypeScript Usage Guide.
When you are ready to ship your app to production, run the following:

> npm run build
This will create a production-ready build of your app in the project's ./dist directory. Check out the Production Deployment Guide to learn more about shipping your app to production.

Next Steps >

Without Build Tools#
To get started with Vue without a build step, simply copy the following code into an HTML file and open it in your browser:

<script src="https://unpkg.com/vue@3"></script>

<div id="app">{{ message }}</div>

<script>
  Vue.createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
The above example uses the global build of Vue where all APIs are exposed under the global Vue variable.

While the global build works, we will be primarily using ES modules syntax throughout the rest of the documentation for consistency. In order to use Vue over native ES modules, use the following HTML instead:

<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
Notice how we can import directly from 'vue' in our code - this is made possible by the <script type="importmap"> block, leveraging a native browser feature called Import Maps. Import maps are currently only available in Chromium-based browsers, so we recommend using Chrome or Edge during the learning process. If your preferred browser does not support import maps yet, you can polyfill it with es-module-shims.

You can add entries for other dependencies to the import map - just make sure they point to the ES modules version of the library you intend to use.

Not for production

The import-maps-based setup is meant for learning only - if you intend to use Vue without build tools in production, make sure to check out the Production Deployment Guide.

Serving over HTTP#
As we dive deeper into the guide, we may need to split our code into separate JavaScript files so that they are easier to manage. For example:

<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
In order for this to work, you need to serve your HTML over the http:// protocol instead of file:// protocol. To start a local HTTP server, first install Node.js, and then run npx serve from the command line in the same directory where your HTML file is. You can also use any other HTTP server that can serve static files with correct MIME types.

You may have noticed that the imported component's template is inlined as a JavaScript string. If you are using VSCode, you can install the es6-string-html extension and prefix the strings with a /*html*/ comment to get syntax highlighting for them.
