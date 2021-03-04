import './styles.css'
import 'styles/markdown.scss'
const App = ({
  Component,
  pageProps
}: {
  Component: any
  pageProps: any
}): JSX.Element => {
  return <Component {...pageProps} />
}

export default App
