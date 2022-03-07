BEGIN;

CREATE OR REPLACE FUNCTION new_player(json) RETURNS "player" AS $$
    INSERT INTO "player" (pseudo, "password") VALUES (
        $1->>'pseudo',
        $1->>'password'
    ) RETURNING *;
$$ LANGUAGE sql STRICT;

COMMIT;