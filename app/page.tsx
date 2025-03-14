import Maps from "@/components/map";

const MapComponent = () => {
  return (
    <>
      <main className="relative flex h-dvh w-dvw overflow-hidden">
        <Maps />
        <div className=" absolute z-30 sm:bottom-11 sm:h-14  max-w-lg shadow-lg bg-background border-2 border-light backdrop-blur-md left-2 right-2 rounded-[24px]">
          <div contentEditable className="outline-0 focus:outline-0 relative w-full h-12 flex items-center"> hello</div>
        </div>
      </main>
    </>
  );
};

export default MapComponent;
