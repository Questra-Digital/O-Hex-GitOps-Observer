ALTER TABLE `selfservice_login_flows` ADD CONSTRAINT `selfservice_login_flows_nid_fk_idx` FOREIGN KEY (`nid`) REFERENCES `networks` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE;