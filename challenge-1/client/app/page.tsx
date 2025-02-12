import ContentPage from "./_content-page";
import SearchBar from "./_search-bar";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-base-100 overflow-hidden">
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="h-12 w-full flex flex-col justify-center items-center mt-12">
          <h1 className="w-full text-center font-semibold text-4xl tracking-wider text-accent">
            Pokedex &#128640;
          </h1>
        </div>
        <SearchBar></SearchBar>
        <ContentPage></ContentPage>
      </div>
    </div>
  );
}
