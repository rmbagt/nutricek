import Image from "next/image";

function NoFood() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <Image
          src="/assets/Ingredients.png"
          alt="Ingredients"
          width={300}
          height={300}
          className="h-52 w-52"
        />
        <h1 className="text-xl">No Drinks Found</h1>
        <p>
          You don&apos;t have any drinks. Go ahead, search and save your
          favorite drink.
        </p>
      </div>
    </>
  );
}

export default NoFood;
