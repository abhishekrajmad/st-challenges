
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import ProductFilterSort from "./challenges/01-product-filter-sort/ProductFilterSort";
import DebouncedUserSearch from "./challenges/02-debounced-user-search/DebouncedUserSearch";
import PersistentTodo from "./challenges/03-persistent-todo/PersistentTodo";
import PomodoroTimer from "./challenges/04-pomodoro-timer/PomodoroTimer";
import SignupWizard from "./challenges/05-multi-step-signup/SignupWizard";
import ShoppingCart from "./challenges/06-shopping-cart-context/ShoppingCart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/challenges" element={<Home />} />

      <Route
        path="/challenges/product-filter-sort"
        element={<ProductFilterSort />}
      />

      <Route
        path="/challenges/debounced-user-search"
        element={<DebouncedUserSearch />}
      />

      <Route path="/challenges/persistent-todo" element={<PersistentTodo />} />

      <Route path="/challenges/pomodoro-timer" element={<PomodoroTimer />} />

      <Route path="/challenges/multi-step-signup" element={<SignupWizard />} />

      <Route path="/challenges/shopping-cart" element={<ShoppingCart />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
