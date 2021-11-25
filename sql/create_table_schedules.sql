 CREATE TABLE IF NOT EXISTS schedules (
        id uuid PRIMARY KEY,
        message text NOT NULL,
        recipient VARCHAR NOT NULL,
        status VARCHAR NOT NULL,
        channel VARCHAR NOT NULL,
        scheduled_at TIMESTAMP NOT NULL
    );