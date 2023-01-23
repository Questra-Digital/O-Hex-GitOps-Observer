package main

import (
	"backend/services/graph"
	"log"
	"net/http"
	"os"
    "github.com/rs/cors"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "4000"

func main() {

	c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:4000"},
        AllowCredentials: true,
    })
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", c.Handler(srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
