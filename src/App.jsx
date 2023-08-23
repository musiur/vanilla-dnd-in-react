import Header from "./components/Header";
import KanbanBody from "./components/KanbanBody";

const App = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Header />
        <KanbanBody />
        <p className="text-8xl container section">
          Nostrud incididunt ullamco sit commodo sit pariatur laborum qui ad et
          eiusmod occaecat ea. Nostrud labore magna incididunt excepteur quis
          culpa nulla cillum sit. Ex ad aliquip proident commodo et magna non
          consequat nostrud deserunt laboris eiusmod. Reprehenderit cillum sint
          adipisicing enim ut adipisicing eiusmod. Magna excepteur magna
          incididunt aliqua est. Consequat aute nisi Lorem veniam ut.
        </p>
      </div>
      <div className="h-screen flex items-center justify-center text-3xl font-semibold text-red-400 block lg:hidden">
        Please open in Desktop full view
      </div>
    </>
  );
};

export default App;
