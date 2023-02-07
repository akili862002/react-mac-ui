<img src="./assets/full-logo.png" height="100px"/>

# React mac ui

### Documentation

Visit <a href="">https://react-mac-ui.netlify.app</a> for full documentation.

<br />

### Getting Started

Learn how to use react-mac-ui components to quickly and easily create elegant and flexible pages using Tailwind CSS.

react-mac-ui is working with Tailwind CSS classes and you need to have Tailwind CSS installed on your project - <a href="https://tailwindcss.com/docs/installation?ref=react-mac-ui" target="_blank">Tailwind CSS Installation.</a>

<br />

1. Intall `react-mac-ui`

```bash
npm i react-mac-ui
```

or

```bash
yarn add react-mac-ui
```

<br />

2. Once you install react-mac-ui you need to wrap your tailwind css configurations with the `withReactMacUI()` function coming from react-mac-ui/config.

```js
const withReactMacUI = require("react-mac-ui/config");

module.exports = withReactMacUI({
  content: ["src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
});
```

<br />

3. Add BaseFeature component in your App.tsx file wrapped outside entire components

```tsx
import { BaseFeature } from 'react-mac-ui';
...

const App: React.FC = () => {
  return (
    <BaseFeature>
        ...
    </BaseFeature>
  )
}

```

<br/>

4. Congratulations 🥳, you did it, now you're ready to use react-mac-ui.

<br />
<br />

## Community

## Contributing

## License

[MIT](https://github.com/akili862002/react-mac-ui/blob/master/LICENSE)
