import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './features/studentsSlice';
import teachersReducer from './features/teachersSlice';
import App from './App';

const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teachersReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
