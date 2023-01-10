// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

/*
 * Ory Kratos API
 *
 * Documentation for all public and administrative Ory Kratos APIs. Public and administrative APIs are exposed on different ports. Public APIs can face the public internet without any protection while administrative APIs should never be exposed without prior authorization. To protect the administative API port you should use something like Nginx, Ory Oathkeeper, or any other technology capable of authorizing incoming requests.
 *
 * API version:
 * Contact: hi@ory.sh
 */

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package client

import (
	"encoding/json"
)

// LoginRequest LoginRequest struct for LoginRequest
type LoginRequest struct {
	// ID is the identifier (\\\"login challenge\\\") of the login request. It is used to identify the session.
	Challenge   *string               `json:"challenge,omitempty"`
	Client      *OAuth2Client         `json:"client,omitempty"`
	OidcContext *OpenIDConnectContext `json:"oidc_context,omitempty"`
	// RequestURL is the original OAuth 2.0 Authorization URL requested by the OAuth 2.0 client. It is the URL which initiates the OAuth 2.0 Authorization Code or OAuth 2.0 Implicit flow. This URL is typically not needed, but might come in handy if you want to deal with additional request parameters.
	RequestUrl                   *string  `json:"request_url,omitempty"`
	RequestedAccessTokenAudience []string `json:"requested_access_token_audience,omitempty"`
	RequestedScope               []string `json:"requested_scope,omitempty"`
	// SessionID is the login session ID. If the user-agent reuses a login session (via cookie / remember flag) this ID will remain the same. If the user-agent did not have an existing authentication session (e.g. remember is false) this will be a new random value. This value is used as the \\\"sid\\\" parameter in the ID Token and in OIDC Front-/Back- channel logout. It's value can generally be used to associate consecutive login requests by a certain user.
	SessionId *string `json:"session_id,omitempty"`
	// Skip, if true, implies that the client has requested the same scopes from the same user previously. If true, you can skip asking the user to grant the requested scopes, and simply forward the user to the redirect URL.  This feature allows you to update / set session information.
	Skip *bool `json:"skip,omitempty"`
	// Subject is the user ID of the end-user that authenticated. Now, that end user needs to grant or deny the scope requested by the OAuth 2.0 client. If this value is set and `skip` is true, you MUST include this subject type when accepting the login request, or the request will fail.
	Subject *string `json:"subject,omitempty"`
}

// NewLoginRequest instantiates a new LoginRequest object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewLoginRequest() *LoginRequest {
	this := LoginRequest{}
	return &this
}

// NewLoginRequestWithDefaults instantiates a new LoginRequest object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewLoginRequestWithDefaults() *LoginRequest {
	this := LoginRequest{}
	return &this
}

// GetChallenge returns the Challenge field value if set, zero value otherwise.
func (o *LoginRequest) GetChallenge() string {
	if o == nil || o.Challenge == nil {
		var ret string
		return ret
	}
	return *o.Challenge
}

// GetChallengeOk returns a tuple with the Challenge field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetChallengeOk() (*string, bool) {
	if o == nil || o.Challenge == nil {
		return nil, false
	}
	return o.Challenge, true
}

// HasChallenge returns a boolean if a field has been set.
func (o *LoginRequest) HasChallenge() bool {
	if o != nil && o.Challenge != nil {
		return true
	}

	return false
}

// SetChallenge gets a reference to the given string and assigns it to the Challenge field.
func (o *LoginRequest) SetChallenge(v string) {
	o.Challenge = &v
}

// GetClient returns the Client field value if set, zero value otherwise.
func (o *LoginRequest) GetClient() OAuth2Client {
	if o == nil || o.Client == nil {
		var ret OAuth2Client
		return ret
	}
	return *o.Client
}

// GetClientOk returns a tuple with the Client field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetClientOk() (*OAuth2Client, bool) {
	if o == nil || o.Client == nil {
		return nil, false
	}
	return o.Client, true
}

// HasClient returns a boolean if a field has been set.
func (o *LoginRequest) HasClient() bool {
	if o != nil && o.Client != nil {
		return true
	}

	return false
}

// SetClient gets a reference to the given OAuth2Client and assigns it to the Client field.
func (o *LoginRequest) SetClient(v OAuth2Client) {
	o.Client = &v
}

// GetOidcContext returns the OidcContext field value if set, zero value otherwise.
func (o *LoginRequest) GetOidcContext() OpenIDConnectContext {
	if o == nil || o.OidcContext == nil {
		var ret OpenIDConnectContext
		return ret
	}
	return *o.OidcContext
}

// GetOidcContextOk returns a tuple with the OidcContext field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetOidcContextOk() (*OpenIDConnectContext, bool) {
	if o == nil || o.OidcContext == nil {
		return nil, false
	}
	return o.OidcContext, true
}

// HasOidcContext returns a boolean if a field has been set.
func (o *LoginRequest) HasOidcContext() bool {
	if o != nil && o.OidcContext != nil {
		return true
	}

	return false
}

// SetOidcContext gets a reference to the given OpenIDConnectContext and assigns it to the OidcContext field.
func (o *LoginRequest) SetOidcContext(v OpenIDConnectContext) {
	o.OidcContext = &v
}

// GetRequestUrl returns the RequestUrl field value if set, zero value otherwise.
func (o *LoginRequest) GetRequestUrl() string {
	if o == nil || o.RequestUrl == nil {
		var ret string
		return ret
	}
	return *o.RequestUrl
}

// GetRequestUrlOk returns a tuple with the RequestUrl field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetRequestUrlOk() (*string, bool) {
	if o == nil || o.RequestUrl == nil {
		return nil, false
	}
	return o.RequestUrl, true
}

// HasRequestUrl returns a boolean if a field has been set.
func (o *LoginRequest) HasRequestUrl() bool {
	if o != nil && o.RequestUrl != nil {
		return true
	}

	return false
}

// SetRequestUrl gets a reference to the given string and assigns it to the RequestUrl field.
func (o *LoginRequest) SetRequestUrl(v string) {
	o.RequestUrl = &v
}

// GetRequestedAccessTokenAudience returns the RequestedAccessTokenAudience field value if set, zero value otherwise.
func (o *LoginRequest) GetRequestedAccessTokenAudience() []string {
	if o == nil || o.RequestedAccessTokenAudience == nil {
		var ret []string
		return ret
	}
	return o.RequestedAccessTokenAudience
}

// GetRequestedAccessTokenAudienceOk returns a tuple with the RequestedAccessTokenAudience field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetRequestedAccessTokenAudienceOk() ([]string, bool) {
	if o == nil || o.RequestedAccessTokenAudience == nil {
		return nil, false
	}
	return o.RequestedAccessTokenAudience, true
}

// HasRequestedAccessTokenAudience returns a boolean if a field has been set.
func (o *LoginRequest) HasRequestedAccessTokenAudience() bool {
	if o != nil && o.RequestedAccessTokenAudience != nil {
		return true
	}

	return false
}

// SetRequestedAccessTokenAudience gets a reference to the given []string and assigns it to the RequestedAccessTokenAudience field.
func (o *LoginRequest) SetRequestedAccessTokenAudience(v []string) {
	o.RequestedAccessTokenAudience = v
}

// GetRequestedScope returns the RequestedScope field value if set, zero value otherwise.
func (o *LoginRequest) GetRequestedScope() []string {
	if o == nil || o.RequestedScope == nil {
		var ret []string
		return ret
	}
	return o.RequestedScope
}

// GetRequestedScopeOk returns a tuple with the RequestedScope field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetRequestedScopeOk() ([]string, bool) {
	if o == nil || o.RequestedScope == nil {
		return nil, false
	}
	return o.RequestedScope, true
}

// HasRequestedScope returns a boolean if a field has been set.
func (o *LoginRequest) HasRequestedScope() bool {
	if o != nil && o.RequestedScope != nil {
		return true
	}

	return false
}

// SetRequestedScope gets a reference to the given []string and assigns it to the RequestedScope field.
func (o *LoginRequest) SetRequestedScope(v []string) {
	o.RequestedScope = v
}

// GetSessionId returns the SessionId field value if set, zero value otherwise.
func (o *LoginRequest) GetSessionId() string {
	if o == nil || o.SessionId == nil {
		var ret string
		return ret
	}
	return *o.SessionId
}

// GetSessionIdOk returns a tuple with the SessionId field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetSessionIdOk() (*string, bool) {
	if o == nil || o.SessionId == nil {
		return nil, false
	}
	return o.SessionId, true
}

// HasSessionId returns a boolean if a field has been set.
func (o *LoginRequest) HasSessionId() bool {
	if o != nil && o.SessionId != nil {
		return true
	}

	return false
}

// SetSessionId gets a reference to the given string and assigns it to the SessionId field.
func (o *LoginRequest) SetSessionId(v string) {
	o.SessionId = &v
}

// GetSkip returns the Skip field value if set, zero value otherwise.
func (o *LoginRequest) GetSkip() bool {
	if o == nil || o.Skip == nil {
		var ret bool
		return ret
	}
	return *o.Skip
}

// GetSkipOk returns a tuple with the Skip field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetSkipOk() (*bool, bool) {
	if o == nil || o.Skip == nil {
		return nil, false
	}
	return o.Skip, true
}

// HasSkip returns a boolean if a field has been set.
func (o *LoginRequest) HasSkip() bool {
	if o != nil && o.Skip != nil {
		return true
	}

	return false
}

// SetSkip gets a reference to the given bool and assigns it to the Skip field.
func (o *LoginRequest) SetSkip(v bool) {
	o.Skip = &v
}

// GetSubject returns the Subject field value if set, zero value otherwise.
func (o *LoginRequest) GetSubject() string {
	if o == nil || o.Subject == nil {
		var ret string
		return ret
	}
	return *o.Subject
}

// GetSubjectOk returns a tuple with the Subject field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *LoginRequest) GetSubjectOk() (*string, bool) {
	if o == nil || o.Subject == nil {
		return nil, false
	}
	return o.Subject, true
}

// HasSubject returns a boolean if a field has been set.
func (o *LoginRequest) HasSubject() bool {
	if o != nil && o.Subject != nil {
		return true
	}

	return false
}

// SetSubject gets a reference to the given string and assigns it to the Subject field.
func (o *LoginRequest) SetSubject(v string) {
	o.Subject = &v
}

func (o LoginRequest) MarshalJSON() ([]byte, error) {
	toSerialize := map[string]interface{}{}
	if o.Challenge != nil {
		toSerialize["challenge"] = o.Challenge
	}
	if o.Client != nil {
		toSerialize["client"] = o.Client
	}
	if o.OidcContext != nil {
		toSerialize["oidc_context"] = o.OidcContext
	}
	if o.RequestUrl != nil {
		toSerialize["request_url"] = o.RequestUrl
	}
	if o.RequestedAccessTokenAudience != nil {
		toSerialize["requested_access_token_audience"] = o.RequestedAccessTokenAudience
	}
	if o.RequestedScope != nil {
		toSerialize["requested_scope"] = o.RequestedScope
	}
	if o.SessionId != nil {
		toSerialize["session_id"] = o.SessionId
	}
	if o.Skip != nil {
		toSerialize["skip"] = o.Skip
	}
	if o.Subject != nil {
		toSerialize["subject"] = o.Subject
	}
	return json.Marshal(toSerialize)
}

type NullableLoginRequest struct {
	value *LoginRequest
	isSet bool
}

func (v NullableLoginRequest) Get() *LoginRequest {
	return v.value
}

func (v *NullableLoginRequest) Set(val *LoginRequest) {
	v.value = val
	v.isSet = true
}

func (v NullableLoginRequest) IsSet() bool {
	return v.isSet
}

func (v *NullableLoginRequest) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableLoginRequest(val *LoginRequest) *NullableLoginRequest {
	return &NullableLoginRequest{value: val, isSet: true}
}

func (v NullableLoginRequest) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableLoginRequest) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}
