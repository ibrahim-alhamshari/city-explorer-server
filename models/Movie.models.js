
class MovieClass {
    constructor(movieData){
      this.overview= movieData.overview,
      this.vote_average= movieData.vote_average,
      this.title=movieData.title,
      this.vote_count= movieData.vote_count,
      this.poster_path=movieData.poster_path,
      this.popularity= movieData.popularity,
      this.release_date= movieData.release_date
    }
  }

  module.exports= MovieClass;