import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from "path";
import {ParsedQs} from "qs";

dotenv.config();

class Results{
  virtualization:number;
  containerization:number;
  docker: number;
  k8s: number;

  constructor(virtualization: number, containerization: number, docker: number, k8s: number) {
    this.virtualization = virtualization;
    this.containerization = containerization;
    this.docker = docker;
    this.k8s = k8s;
  }
}

class VotingService{
  results: Results;


  constructor(results: Results) {
    this.results = results;
  }

  public vote(virtualization:undefined | string | string[] | ParsedQs | ParsedQs[],
              containerization:undefined | string | string[] | ParsedQs | ParsedQs[],
              docker:undefined | string | string[] | ParsedQs | ParsedQs[],
              k8s:undefined | string | string[] | ParsedQs | ParsedQs[]){
    if (!!virtualization){
      this.results.virtualization++;
    }

    if (!!containerization){
      this.results.containerization++;
    }

    if (!!docker){
      this.results.docker++;
    }

    if (!!k8s){
      this.results.k8s++;
    }
  }
}

const app: Express = express();
const port = process.env.PORT;
const votingService = new VotingService({virtualization:0, containerization:0, docker:0, k8s:0})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index", { title: "Главная"});
});
app.get("/vote", (req, res) => {
  votingService.vote(req.query.virtualization, req.query.containerization, req.query.docker, req.query.k8s)
  console.log(req.get("virtualization"))
  console.log(req.params)
  console.log(req.body)
  console.log(req.url)
  console.log(req.query.virtualization)
  console.log(req.query.containerization)
  console.log(req.query.docker)
  console.log(req.query.k8s)

  res.redirect("/results");
});

app.get("/results", (req, res) => {
  res.render("results", {
    title: "Результаты",
    results: {
      virtualization: votingService.results.virtualization,
      containerization: votingService.results.containerization,
      docker: votingService.results.docker,
      k8s: votingService.results.k8s,
    }});
});

app.get("/reset", (req, res) => {
  votingService.results.docker = 0;
  votingService.results.virtualization = 0;
  votingService.results.containerization = 0;
  votingService.results.k8s = 0;
  res.redirect("/results");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

