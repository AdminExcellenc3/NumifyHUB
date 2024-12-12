"use client";

import { useState, useEffect } from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import type { InvoiceFormValues } from "@/lib/types/invoice";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "100%",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  tableCell: {
    width: "25%",
    padding: 5,
  },
  total: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
});

interface InvoicePDFProps {
  data?: any;
}

const InvoicePDF = ({ data }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>FACTUUR</Text>
        <Text style={styles.companyInfo}>
          Bedrijfsnaam B.V.{"\n"}
          Straatnaam 123{"\n"}
          1234 AB Amsterdam{"\n"}
          Nederland{"\n"}
          BTW: NL123456789B01{"\n"}
          KVK: 12345678
        </Text>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Omschrijving</Text>
            <Text style={styles.tableCell}>Aantal</Text>
            <Text style={styles.tableCell}>Prijs</Text>
            <Text style={styles.tableCell}>Totaal</Text>
          </View>
          {/* Example invoice items */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Product A</Text>
            <Text style={styles.tableCell}>2</Text>
            <Text style={styles.tableCell}>€ 100,00</Text>
            <Text style={styles.tableCell}>€ 200,00</Text>
          </View>
        </View>

        <Text style={styles.total}>Totaal: € 200,00</Text>
      </View>
    </Page>
  </Document>
);

export function InvoicePdfPreview() {
  const [showPreview, setShowPreview] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceFormValues | null>(null);

  useEffect(() => {
    if (showPreview) {
      try {
        const data = localStorage.getItem('invoiceFormData');
        if (data) {
          setInvoiceData(JSON.parse(data));
        }
      } catch (e) {
        console.error('Error parsing invoice data:', e);
      }
    }
  }, [showPreview]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Eye className="mr-2 h-4 w-4" />
          {showPreview ? "Verberg voorbeeld" : "Toon voorbeeld"}
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {showPreview && (
        <div className="h-[800px] w-full border rounded-lg overflow-hidden">
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <InvoicePDF data={invoiceData} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}