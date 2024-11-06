-- Initial data for the database

-- Default Superadmin
INSERT INTO users (
    id,
    email,
    password,
    name,
    role,
    is_active,
    created_at
) VALUES (
    UUID(),
    'info@cleaningelements.com',
    '$2b$10$CO2020sol@', -- Asegúrate de cambiar esto por un hash real
    'Super Admin',
    'superadmin',
    true,
    NOW()
);

-- Default Organization (for development and testing)
INSERT INTO organizations (
    id,
    name,
    admin_email,
    max_rooms,
    max_zones,
    max_users,
    is_active,
    created_at
) VALUES (
    UUID(),
    'CleaningElements Demo',
    'demo@cleaningelements.com',
    5,
    5,
    10,
    true,
    NOW()
);

-- Default Zones
INSERT INTO zones (id, organization_id, name, description, is_active, created_at) VALUES
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Cocina', 'Zona de preparación y almacenamiento de alimentos', true, NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Terraza', 'Espacio exterior con plantas y mobiliario', true, NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Azotea', 'Área superior con lavadero y espacio multiusos', true, NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Pasillos', 'Zonas de tránsito y conexión', true, NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Escaleras', 'Accesos entre niveles', true, NOW());

-- Default Rooms
INSERT INTO rooms (id, organization_id, element, current_zone, created_at) VALUES
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Agua', 'Cocina', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Aire', 'Terraza', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Fuego', 'Azotea', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Tierra', 'Pasillos', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), 'Éter', 'Escaleras', NOW());

-- Default Tasks for each zone
-- Cocina
INSERT INTO tasks (id, organization_id, zone_id, description, created_at) VALUES
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Remojar filtros de campana extractora con desengrasante', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar filtros de campana extractora', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar polvo encima de las neveras', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar polvo encima de la campana extractora', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar polvo del mueble de madera', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar polvo de las estanterías', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar la ventana de la cocina', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Remojar paños de cocina en lejía', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Lavar y secar paños de cocina', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar encimera y barra americana', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar manchas en paredes', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar el horno', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar el microondas', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Limpiar neveras por fuera', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Barrer el suelo', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Cocina' LIMIT 1), 'Fregar el suelo', NOW());

-- Terraza
INSERT INTO tasks (id, organization_id, zone_id, description, created_at) VALUES
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Terraza' LIMIT 1), 'Limpiar polvo de estanterías', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Terraza' LIMIT 1), 'Limpiar polvo debajo de la escalera', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Terraza' LIMIT 1), 'Barrer suelo moviendo el mobiliario', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Terraza' LIMIT 1), 'Fregar suelo moviendo el mobiliario', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Terraza' LIMIT 1), 'Regar plantas', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Terraza' LIMIT 1), 'Limpiar mesa de cristal', NOW());

-- Azotea
INSERT INTO tasks (id, organization_id, zone_id, description, created_at) VALUES
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Barrer suelo', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Limpiar encimera', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Limpiar cocina', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Limpiar polvo de estanterías', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Limpiar horno de piedra', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Limpiar pileta', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Desinfectar retrete', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Reponer papel higiénico', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Regar plantas', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Azotea' LIMIT 1), 'Fregar suelo', NOW());

-- Pasillos
INSERT INTO tasks (id, organization_id, zone_id, description, created_at) VALUES
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Pasillos' LIMIT 1), 'Barrer pasillos', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Pasillos' LIMIT 1), 'Limpiar polvo de muebles', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Pasillos' LIMIT 1), 'Limpiar polvo de bordes de madera', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Pasillos' LIMIT 1), 'Fregar suelo', NOW());

-- Escaleras
INSERT INTO tasks (id, organization_id, zone_id, description, created_at) VALUES
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Escaleras' LIMIT 1), 'Barrer escaleras desde la entrada superior hasta la calle', NOW()),
(UUID(), (SELECT id FROM organizations LIMIT 1), (SELECT id FROM zones WHERE name = 'Escaleras' LIMIT 1), 'Fregar escaleras desde la entrada superior hasta la calle', NOW());

-- Default Settings for the organization
INSERT INTO settings (
    id,
    organization_id,
    rotation_day,
    notifications_enabled,
    email_notifications,
    backup_enabled,
    backup_frequency,
    maintenance_mode,
    created_at
) VALUES (
    UUID(),
    (SELECT id FROM organizations LIMIT 1),
    'monday',
    true,
    true,
    true,
    'weekly',
    false,
    NOW()
);

-- Default Email Templates
INSERT INTO email_templates (id, name, subject, body, variables, is_active, created_at) VALUES
(UUID(), 'welcome', 'Bienvenido a CleaningElements', 'Hola {{name}},\n\nBienvenido a CleaningElements. Tu cuenta ha sido creada exitosamente.\n\nSaludos,\nEl equipo de CleaningElements', '{"name": "string"}', true, NOW()),
(UUID(), 'task_reminder', 'Recordatorio de Tareas', 'Hola {{name}},\n\nTe recordamos que tienes tareas pendientes en la zona {{zone}}.\n\nSaludos,\nEl equipo de CleaningElements', '{"name": "string", "zone": "string"}', true, NOW()),
(UUID(), 'password_reset', 'Restablecer Contraseña', 'Hola {{name}},\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:\n\n{{resetLink}}\n\nSi no solicitaste esto, ignora este mensaje.\n\nSaludos,\nEl equipo de CleaningElements', '{"name": "string", "resetLink": "string"}', true, NOW()),
(UUID(), 'zone_rotation', 'Rotación de Zonas', 'Hola {{name}},\n\nLas zonas han rotado. Tu nueva zona es {{newZone}}.\n\nSaludos,\nEl equipo de CleaningElements', '{"name": "string", "newZone": "string"}', true, NOW());

-- Default API Keys
INSERT INTO api_keys (
    id,
    organization_id,
    name,
    api_key,
    expires_at,
    is_active,
    created_at
) VALUES (
    UUID(),
    (SELECT id FROM organizations LIMIT 1),
    'Default API Key',
    'ce_' || LOWER(HEX(RANDOM_BYTES(32))),
    DATE_ADD(NOW(), INTERVAL 1 YEAR),
    true,
    NOW()
);

-- Initial Audit Log
INSERT INTO audit_logs (
    id,
    organization_id,
    user_id,
    action,
    entity_type,
    entity_id,
    changes,
    created_at
) VALUES (
    UUID(),
    (SELECT id FROM organizations LIMIT 1),
    (SELECT id FROM users WHERE email = 'info@cleaningelements.com' LIMIT 1),
    'system_init',
    'system',
    'system',
    '{"event": "Initial system setup completed"}',
    NOW()
);