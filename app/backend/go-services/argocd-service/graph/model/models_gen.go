// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Annotations struct {
	Kubectlkubernetesiolastappliedconfiguration *string `json:"kubectlkubernetesiolastappliedconfiguration"`
}

type Automated struct {
	Prune    *bool `json:"prune"`
	SelfHeal *bool `json:"selfHeal"`
}

type ComparedTo struct {
	Destination *Destination `json:"destination"`
	Source      *Source      `json:"source"`
}

type Destination struct {
	Server    *string `json:"server"`
	Namespace *string `json:"namespace"`
}

type Health struct {
	Status *string `json:"status"`
}

type History struct {
	Revision        *string `json:"revision"`
	DeployedAt      *string `json:"deployedAt"`
	ID              *int    `json:"id"`
	DeployStartedAt *string `json:"deployStartedAt"`
	Source          *Source `json:"source"`
}

type InitiatedBy struct {
	Automated *bool `json:"automated"`
}

type Items struct {
	Status   *Status   `json:"status"`
	Spec     *Spec     `json:"spec"`
	Metadata *Metadata `json:"metadata"`
}

type JobListing struct {
	ID       string            `json:"_id"`
	Metadata *MyObjectMetadata `json:"metadata"`
	Items    []*Items          `json:"items"`
}

type ManagedFields struct {
	Manager    *string `json:"manager"`
	Operation  *string `json:"operation"`
	APIVersion *string `json:"apiVersion"`
	Time       *string `json:"time"`
	FieldsType *string `json:"fieldsType"`
}

type Metadata struct {
	Name              *string          `json:"name"`
	Namespace         *string          `json:"namespace"`
	UID               *string          `json:"uid"`
	ResourceVersion   *string          `json:"resourceVersion"`
	Generation        *int             `json:"generation"`
	CreationTimestamp *string          `json:"creationTimestamp"`
	ManagedFields     []*ManagedFields `json:"managedFields"`
	Annotations       *Annotations     `json:"annotations"`
}

type MyObjectMetadata struct {
	ResourceVersion *string `json:"resourceVersion"`
}

type Operation struct {
	Retry       *Retry       `json:"retry"`
	InitiatedBy *InitiatedBy `json:"initiatedBy"`
	Sync        *Sync        `json:"sync"`
}

type OperationState struct {
	Phase      *string     `json:"phase"`
	Message    *string     `json:"message"`
	StartedAt  *string     `json:"startedAt"`
	FinishedAt *string     `json:"finishedAt"`
	SyncResult *SyncResult `json:"syncResult"`
	Operation  *Operation  `json:"operation"`
}

type Resources struct {
	Group     *string `json:"group"`
	Version   *string `json:"version"`
	Kind      *string `json:"kind"`
	Namespace *string `json:"namespace"`
	Name      *string `json:"name"`
	Status    *string `json:"status"`
	Message   *string `json:"message"`
	HookPhase *string `json:"hookPhase"`
	SyncPhase *string `json:"syncPhase"`
}

type Retry struct {
	Limit *int `json:"limit"`
}

type Source struct {
	RepoURL        *string `json:"repoURL"`
	Path           *string `json:"path"`
	TargetRevision *string `json:"targetRevision"`
}

type Spec struct {
	Project     *string      `json:"project"`
	SyncPolicy  *SyncPolicy  `json:"syncPolicy"`
	Destination *Destination `json:"destination"`
	Source      *Source      `json:"source"`
}

type Status struct {
	ReconciledAt   *string         `json:"reconciledAt"`
	SourceType     *string         `json:"sourceType"`
	Summary        *Summary        `json:"summary"`
	OperationState *OperationState `json:"operationState"`
	History        []*History      `json:"history"`
	Health         *Health         `json:"health"`
	Sync           *Sync           `json:"sync"`
	Resources      []*Resources    `json:"resources"`
}

type Summary struct {
	Images []*string `json:"images"`
}

type Sync struct {
	Revision    *string   `json:"revision"`
	Prune       *bool     `json:"prune"`
	SyncOptions []*string `json:"syncOptions"`
}

type SyncPolicy struct {
	SyncOptions []*string  `json:"syncOptions"`
	Automated   *Automated `json:"automated"`
}

type SyncResult struct {
	Revision  *string      `json:"revision"`
	Source    *Source      `json:"source"`
	Resources []*Resources `json:"resources"`
}
