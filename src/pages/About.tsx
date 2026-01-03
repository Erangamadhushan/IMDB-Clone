const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#4b0000] via-[#7a0000] to-[#2a0000] text-white">
      {/* Back Button */}
      <div className="px-8 pt-6">
        <button
          onClick={() => window.history.back()}
          className="text-yellow-400 hover:text-yellow-300 transition font-medium"
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About IMDB Clone
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
          IMDB Clone is a project inspired by the popular Internet Movie
          Database (IMDB). It is designed to help users explore movie
          information, search for films, and manage their favorite movie
          collections in a modern and user-friendly way.
        </p>

        {/* Divider */}
        <div className="w-24 h-1 bg-yellow-400 mx-auto my-10 rounded"></div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-black/60 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              🎥 Discover Movies
            </h3>
            <p className="text-gray-300">
              Browse trending, popular, and top-rated movies with detailed
              information including ratings, release year, and posters.
            </p>
          </div>

          <div className="bg-black/60 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              ⭐ Favorites Collection
            </h3>
            <p className="text-gray-300">
              Save your favorite movies to your personal collection and access
              them anytime from your favorites page.
            </p>
          </div>

          <div className="bg-black/60 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              🔍 Smart Search
            </h3>
            <p className="text-gray-300">
              Quickly search for movies, TV shows, and actors with an intuitive
              and responsive search experience.
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-16 text-gray-400 text-sm">
          Built with ❤️ using React, Tailwind CSS, and Movie APIs.
        </p>
      </div>
    </div>
  );
};

export default About;
