import Image from "next/image";

const NoDrink = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen justify-center text-center items-center">
                <Image src='/assets/Ingredients.png' alt='Ingredients' width={300} height={300} className="w-52 h-52"/>
                <h1 className="text-xl">No Drinks Found</h1>
                <p>You don&apos;t have any drinks. Go ahead, search and save your favorite drink.</p>
            </div>
        </>
    );
};

export default NoDrink;