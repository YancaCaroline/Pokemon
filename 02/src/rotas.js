const express = require("express");

const { pokemon, pokemons, evolucoes } = require("./controladores/pokemons");

const rotas = express();

rotas.get("/pokemon/:nome", pokemon);
rotas.get("/pokemon", pokemons);
rotas.get("/pokemon/detalhar/:id", evolucoes);

module.exports = rotas;
