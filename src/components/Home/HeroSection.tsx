import IMDBNavbar  from "../Navbar";

export const HeroSection = () => {
  return (
    <section className="hero-section w-full min-h-screen bg-gray-800 flex flex-col justify-center items-start px-4 " style={{ backgroundImage: 'url(/theatre-room2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <IMDBNavbar />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/80 opacity-90  flex flex-col justify-end p-4 transition-opacity"></div>
        <div className=" text-white max-w-5xl z-20 p-10">
            <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-8xl font-bold text-yellow-400">IMDB Clone</h1>
            <p className="mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Your ultimate destination for movie information and reviews. Discover, explore, and stay updated with the latest in cinema.<br/>
                Find your next favorite movie <span className="text-yellow-400 font-semibold">Today!</span> 
            </p>
        </div>
    </section>
  )
}
