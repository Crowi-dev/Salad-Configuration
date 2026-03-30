import React from "react"

const Header = () =>{
    return (
        <>
        <div className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
            <p
               className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg"
            >
                {/*Header*/}

                <span className="text-[10px] leading-tight text center">
                    Fresh Food Factory
                </span>
            </p>

        {/* Center Title */}
        <h1 className="text-3xl font-black tracking-widest mt-6">
            BOWL-LASKURI
        </h1>
    
        {/*Right menu*/}
        <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
            <p className="hover:underline cursor-pointer">Kirjaudu sisään</p>
            <p className="hover:underline cursor-pointer">Tallennetut reseptit</p>
            <p className="hover:underline cursor-pointer">Ohjeet ja Tuki</p>
        </div>
     </div>
     </>
    ); 
}
export default Header;



