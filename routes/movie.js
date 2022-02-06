const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');


router.get('/top10', (req,res) =>{
    const promise = Movie.find({}).limit(10).sort({ imdb_score : -1 });

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete('/:movie_id', (req,res, next) =>{
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((data) => {
        if (!data)
            next({message:'The movie was not found',code: 9999});
        res.json({status:1});
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/:movie_id', (req,res, next) =>{
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new:true
        }
    );

    promise.then((data) => {
        if (!data)
            next({message:'The movie was not found',code: 9999});

        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:movie_id', (req,res, next) =>{
    const promise = Movie.findById(req.params.movie_id);

    promise.then((data) => {
        if (!data)
            next({message:'The movie was not found',code: 9999});
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/',(req,res,next) => {
    const promise = Movie.find({ });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/', (req, res, next) =>{
    const {title,imdb_score, category,country,year} = req.body;

    const movie = new Movie({
        title:title,
        imdb_score: imdb_score,
        category:category,
        country:country,
        year:year
    });
  const promise = movie.save();
  promise.then((data) => {
      res.json(data);
      
  }).catch((err) => {
      res.json(err);
  });
});

module.exports = router;
