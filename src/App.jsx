
import Header from "./components/Header";
import KanbanBody from "./components/KanbanBody";

const App = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Header />
        <KanbanBody />
        <p className="text-9xl container section">
          Commodo cupidatat duis quis nisi. Dolor qui enim labore quis laborum
          quis laborum anim sint reprehenderit. Do ullamco pariatur in aute est.
          Ullamco non minim consectetur nostrud. Velit commodo fugiat commodo ea
          sit consectetur incididunt.
        </p>
      </div>
      <div className="h-screen flex items-center justify-center text-3xl font-semibold text-red-400 block lg:hidden">
        Please open in Desktop full view
      </div>
    </>
  );
};

export default App;
