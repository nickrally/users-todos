import { Provider } from 'react-redux'
import store from './store'
import Combined from './combined/components/Combined'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Combined />
      </div>
    </Provider>
  );
}

export default App;
