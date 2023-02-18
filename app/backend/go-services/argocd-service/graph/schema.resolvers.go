package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.22

import (
	"backend/services/graph/model"
	"backend/services/services"
	"context"
)

// CreateWorkspace is the resolver for the createWorkspace field.
func (r *mutationResolver) CreateWorkspace(ctx context.Context, input model.CreateWorkspaceInput) (*model.Workspace, error) {
	return db.CreateWorkspace(input), nil
}

// UpdateWorkspace is the resolver for the updateWorkspace field.
func (r *mutationResolver) UpdateWorkspace(ctx context.Context, id string, input model.UpdateWorkspaceInput) (*model.Workspace, error) {
	return db.UpdateWorkspace(id, input), nil
}

// DeleteWorkspace is the resolver for the deleteWorkspace field.
func (r *mutationResolver) DeleteWorkspace(ctx context.Context, id string) (*model.DeleteWorkspaceResponse, error) {
	return db.DeleteWorkspace(id), nil
}

// Getallworkspaces is the resolver for the getallworkspaces field.
func (r *queryResolver) Getallworkspaces(ctx context.Context) ([]*model.Workspace, error) {
	return db.GetAllWorkspaces(), nil
}

// Getworkspace is the resolver for the getworkspace field.
func (r *queryResolver) Getworkspace(ctx context.Context, id string) (*model.Workspace, error) {
	return db.GetWorkspace(id), nil
}

// Getworkspacesbyusername is the resolver for the getworkspacesbyusername field.
func (r *queryResolver) Getworkspacesbyusername(ctx context.Context, username string) ([]*model.Workspace, error) {
	return db.GetWorkspacesByUsername(username), nil
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
