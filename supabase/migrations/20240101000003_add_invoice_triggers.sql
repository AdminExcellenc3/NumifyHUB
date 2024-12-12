-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for invoices
CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for invoice_items
CREATE TRIGGER update_invoice_items_updated_at
    BEFORE UPDATE ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate invoice totals
CREATE OR REPLACE FUNCTION calculate_invoice_totals()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate totals for the invoice
    WITH item_totals AS (
        SELECT 
            invoice_id,
            SUM(quantity * unit_price) as subtotal,
            SUM(quantity * unit_price * (tax_rate / 100)) as tax_amount
        FROM invoice_items
        WHERE invoice_id = NEW.invoice_id
        GROUP BY invoice_id
    )
    UPDATE invoices
    SET 
        subtotal = item_totals.subtotal,
        tax_amount = item_totals.tax_amount,
        total = item_totals.subtotal + item_totals.tax_amount
    FROM item_totals
    WHERE invoices.id = item_totals.invoice_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for invoice items
CREATE TRIGGER calculate_invoice_totals_insert
    AFTER INSERT ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION calculate_invoice_totals();

CREATE TRIGGER calculate_invoice_totals_update
    AFTER UPDATE ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION calculate_invoice_totals();

CREATE TRIGGER calculate_invoice_totals_delete
    AFTER DELETE ON invoice_items
    FOR EACH ROW
    EXECUTE FUNCTION calculate_invoice_totals();