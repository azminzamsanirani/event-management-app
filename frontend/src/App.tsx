import { Routes, Route } from "react-router-dom";
import CreateEventForm from "./components/CreateEventForm";
import AdminEvents from "./pages/AdminEvents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateEventForm />} />
      <Route path="/admin/events" element={<AdminEvents />} />
    </Routes>
  );
}

export default App;
