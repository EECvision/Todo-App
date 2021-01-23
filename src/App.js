import TodoDisplay from './components/todo-display.component';
import ThemeContextProvider from './components/theme-context';

import './App.css';

function App(){
  return(
      <ThemeContextProvider>
          <TodoDisplay/>
      </ThemeContextProvider>
  )
}

export default App;
