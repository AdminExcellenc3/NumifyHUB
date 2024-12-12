-- Create invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  invoice_number TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES clients(id) ON DELETE RESTRICT NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5,2) NOT NULL DEFAULT 21,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  notes TEXT,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL
);

-- Create invoice items table
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5,2) NOT NULL DEFAULT 21,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0
);

-- Enable RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own invoices"
  ON invoices FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = invoices.company_id
    AND companies.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own invoices"
  ON invoices FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = invoices.company_id
    AND companies.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own invoices"
  ON invoices FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = invoices.company_id
    AND companies.user_id = auth.uid()
  ));

-- Create policies for invoice items
CREATE POLICY "Users can manage their invoice items"
  ON invoice_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM invoices
    JOIN companies ON companies.id = invoices.company_id
    WHERE invoice_items.invoice_id = invoices.id
    AND companies.user_id = auth.uid()
  ));