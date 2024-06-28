-- Create schema.sql
-- Schema to store accounts, transactions, and daily balances

-- Create table to store accounts
CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    account_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table to store fiat transactions
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- Create table to store daily fiat balances
CREATE TABLE daily_balances (
    balance_id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    balance_date DATE NOT NULL,
    balance DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id),
    UNIQUE (account_id, balance_date)
);

-- Indexes to improve performance
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_daily_balances_account_id ON daily_balances(account_id);
CREATE INDEX idx_daily_balances_balance_date ON daily_balances(balance_date);

-- Stored Procedure to calculate daily balances
DELIMITER $$

CREATE PROCEDURE calculate_daily_balances()
BEGIN
    DECLARE current_date DATE;
    SET current_date = CURDATE();

    -- Insert or update daily balances
    INSERT INTO daily_balances (account_id, balance_date, balance)
    SELECT 
        account_id,
        current_date,
        COALESCE(SUM(amount), 0)
    FROM transactions
    WHERE DATE(transaction_date) = current_date
    GROUP BY account_id
    ON DUPLICATE KEY UPDATE balance = VALUES(balance);
END $$

DELIMITER ;
