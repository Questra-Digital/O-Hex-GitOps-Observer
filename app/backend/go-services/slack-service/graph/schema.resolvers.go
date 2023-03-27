package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.22

import (
	"backend/services/graph/model"
	"backend/services/services"
	"context"
	
)

// CreateSlackCredentials is the resolver for the createSlackCredentials field.
func (r *mutationResolver) CreateSlackCredentials(ctx context.Context, input model.CreateSlackCredentialsInput) (*model.SlackCredentials, error) {
	return db.CreateSlackCredentials(input), nil
}

// UpdateSlackCredentials is the resolver for the updateSlackCredentials field.
func (r *mutationResolver) UpdateSlackCredentials(ctx context.Context, id string, input model.UpdateSlackCredentialsInput) (*model.SlackCredentials, error) {
	updatedSlackCredentials, err := db.UpdateSlackCredentials(id, input)
    if err != nil {
        return nil, err
    }

    return updatedSlackCredentials, nil
}

// SendMessage is the resolver for the sendMessage field.
func (r *queryResolver) SendMessage(ctx context.Context, userbottoken string, channelid string, message string) (string, error) {
	return db.SendMessage(userbottoken, channelid, message), nil
}

// GetSlackCredentials is the resolver for the getSlackCredentials field.
func (r *queryResolver) GetSlackCredentials(ctx context.Context, username string) (*model.SlackCredentials, error) {
	return db.GetSlackCredentials(username), nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
var db = services.Connect()