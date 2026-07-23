'use client';
import { IPcBuild } from '@/types/pcbuilder';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import React from 'react';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoContainer: {
    width: 100,
    height: 40,
  },
  logo: {
    width: 100,
    height: 40,
    objectFit: 'contain',
  },
  companyInfo: {
    textAlign: 'right',
  },
  companyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#17191c',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  table: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ced6da',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f85a16',
    borderBottomWidth: 1,
    borderBottomColor: '#ced6da',
    color: '#ffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ced6da',
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: '#ced6da',
  },
  tableCell: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 10,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: '#ced6da',
  },
  productCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCell: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 4,
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  totalContainer: {
    backgroundColor: '#000000',
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'flex-end',
    minWidth: 80,
  },
  totalText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});

// PDF Document Component
const PcBuilderPdfSummary = ({ buildData }: { buildData: IPcBuild[] }) => {
  const totalPrice = buildData.reduce(
    (prev, item) => prev + (item?.product?.price || 0),
    0,
  );

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/logo/dailyit-logo-black.png" />
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyText}>Gadget Grid Inc.</Text>
            <Text style={[styles.companyText, { paddingVertical: 3 }]}>
              123 Tech Street, Innovation City, TX 12345
            </Text>
            <Text style={styles.companyText}>Phone: (123) 456-7890</Text>
          </View>
        </View>
        {/* <Text style={styles.title}>Gadget Grid PC Builder: Build Your PC</Text> */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={[styles.tableCellHeader, { width: '30%' }]}>
              <Text>Component</Text>
            </View>
            <View style={[styles.tableCellHeader, { width: '50%' }]}>
              <Text>Product</Text>
            </View>
            <View
              style={[
                styles.tableCellHeader,
                { width: '20%', borderRightWidth: 0 },
              ]}
            >
              <Text>Price</Text>
            </View>
          </View>
          {buildData?.map((bPart) => (
            <View key={bPart.id} style={styles.tableRow}>
              <View style={[styles.tableCell, { width: '30%' }]}>
                <Text style={{ fontWeight: 'bold' }}>{bPart.name}</Text>
              </View>
              <View style={[styles.tableCell, { width: '50%' }]}>
                <View style={styles.productCell}>
                  {bPart.product && (
                    <>
                      <View style={styles.imageCell}>
                        <Image
                          style={styles.image}
                          src={bPart.product.thumbnail}
                        />
                      </View>
                      <Text style={{ fontSize: 9, width: '70%' }}>
                        {bPart?.product?.name}
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.tableCell,
                  { width: '20%', borderRightWidth: 0 },
                ]}
              >
                {bPart?.product && (
                  <Text
                    style={{
                      color: '#0000FF',
                      fontSize: 9,
                      fontWeight: 'bold',
                    }}
                  >
                    ${bPart?.product?.price}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PcBuilderPdfSummary;
