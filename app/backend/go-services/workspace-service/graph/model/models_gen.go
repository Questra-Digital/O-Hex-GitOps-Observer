// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type CreateWorkspaceInput struct {
	Name     string `json:"name"`
	Username string `json:"username"`
}

type DeleteWorkspaceResponse struct {
	DeletedWorkspaceID string `json:"deletedWorkspaceId"`
}

type UpdateWorkspaceInput struct {
	Name *string `json:"name"`
}

type Workspace struct {
	ID       string `json:"_id" bson:"_id"`
	Name     string `json:"name"`
	Username string `json:"username"`
}
