-- Add invoice_number column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'invoices' 
        AND column_name = 'invoice_number'
    ) THEN
        ALTER TABLE invoices ADD COLUMN invoice_number TEXT NOT NULL UNIQUE;
    END IF;
END $$;

-- Create function to generate next invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    year TEXT;
    last_number INTEGER;
    next_number TEXT;
BEGIN
    year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
    
    SELECT COALESCE(
        MAX(NULLIF(REGEXP_REPLACE(invoice_number, '^INV-\d{4}-(\d+)$', '\1'), '')),
        '0'
    )::INTEGER
    INTO last_number
    FROM invoices
    WHERE invoice_number LIKE 'INV-' || year || '-%';
    
    next_number := 'INV-' || year || '-' || LPAD((last_number + 1)::TEXT, 4, '0');
    
    RETURN next_number;
END;
$$ LANGUAGE plpgsql;