BEGIN;

CREATE OR REPLACE FUNCTION score_update(json) RETURNS "player" AS $$
    UPDATE "player" SET
        best_score=($1->>'score')::int
    WHERE id=($1->>'id')::int RETURNING *;
$$ LANGUAGE sql STRICT;

COMMIT;