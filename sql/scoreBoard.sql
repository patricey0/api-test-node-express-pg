BEGIN;

CREATE OR REPLACE VIEW scoreboard AS
    SELECT pseudo, best_score FROM "player"
    ORDER BY best_score DESC;

COMMIT;