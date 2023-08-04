import Header from "./components/Header";
import KanbanBody from "./components/KanbanBody";

const App = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Header />
        <KanbanBody />
      </div>
      <div className="h-screen flex items-center justify-center text-3xl font-semibold text-red-400 block lg:hidden">Please open in Desktop full view</div>
    </>
  );
};

export default App;
