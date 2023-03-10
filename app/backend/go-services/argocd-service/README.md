# GOLANG GRAPHQL MONGODB CRUD Project




`go mod tidy`

After you've written the graphql schema, run this - `go run github.com/99designs/gqlgen generate`




=========================

#### Get Job By Id

`query GetJob($id: ID!) {
  job(id: $id) {
    _id
	metadata{
    resourceVersion
  }
    items{
      spec{
        project
        source{
          targetRevision
          repoURL
          path
        }
      }
      
    }

  }
}`


`{
  "id": "638051d7acc418c13197fdf7"
}`

