const axios = require("axios");
const cron = require("cron");
const dados = [];
const fs = require("fs");
const poke = [];
// Fiz o cronJob, porém não entendi como fazer a utilização dele na aplicação.
const job = new cron.CronJob(
  "* * * * * *",
  async () => {
    const { data } = await axios(`https://pokeapi.co/api/v2/evolution-chain`);
    dados.push(data);
  },
  null,
  true,
  "America/Sao_Paulo"
);

job.start();

const pokemon = async (req, res) => {
  const { nome } = req.params;
  try {
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${nome}/`);
    return res.status(200).json(data.forms[0].name);
  } catch (error) {
    console.error(error);
  }
};

const pokemons = async (req, res) => {
  const { evolution } = req.query;

  try {
    const { data } = await axios(
      `https://pokeapi.co/api/v2/evolution-chain/?limit=20`
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const evolucoes = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { pokemons, pokemon, evolucoes };
