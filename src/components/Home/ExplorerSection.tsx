
export const ExplorerSection = () => {
    return (
        <section className="explorer-section w-full  py-20  border-b-4 border-b-red-950 bg-linear-to-l from-red-950 via-red-800 to-red-950 text-white items-center px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-2">
                <div >
                    <h2 className="text-4xl font-bold mb-4 text-center">Explore More Movies</h2>
                    <p className="text-lg mb-6 max-w-3xl text-center">
                        Dive deeper into our extensive movie database. Discover hidden gems, explore different genres, and find movies that match your unique taste. Start your cinematic adventure now!
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <a href="/explore" className="py-3 px-6 bg-yellow-400 text-white rounded-xl font-medium whitespace-nowrap 
                        hover:bg-yellow-500 transition-colors">
                        Explore Now
                    </a>
                </div>
            </div>
        </section>
    )
};
