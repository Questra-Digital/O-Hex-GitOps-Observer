UPDATE identity_credentials SET nid = (SELECT id FROM networks LIMIT 1);