INSERT INTO "_identity_verification_tokens_tmp" (id, token, used, used_at, expires_at, issued_at, identity_verifiable_address_id, selfservice_verification_flow_id, created_at, updated_at, nid) SELECT id, token, used, used_at, expires_at, issued_at, identity_verifiable_address_id, selfservice_verification_flow_id, created_at, updated_at, nid FROM "identity_verification_tokens";