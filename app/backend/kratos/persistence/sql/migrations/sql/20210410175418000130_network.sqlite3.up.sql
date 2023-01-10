CREATE TABLE "_selfservice_verification_flows_tmp" (
"id" TEXT PRIMARY KEY,
"request_url" TEXT NOT NULL,
"issued_at" DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
"expires_at" DATETIME NOT NULL,
"csrf_token" TEXT NOT NULL,
"created_at" DATETIME NOT NULL,
"updated_at" DATETIME NOT NULL,
"type" TEXT NOT NULL DEFAULT 'browser',
"state" TEXT NOT NULL DEFAULT 'show_form',
"active_method" TEXT,
"ui" TEXT,
"nid" char(36)
);