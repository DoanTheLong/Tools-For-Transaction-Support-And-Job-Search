// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// _mock_
import { _invoices } from '../../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import InvoiceNewEditForm from '../../../../sections/@dashboard/invoice/form';
import { useState,useEffect } from 'react';

//axios
import axios from 'axios';

// ----------------------------------------------------------------------
import { API_ROOT,appName } from 'src/config-global';
InvoiceEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {
  const { themeStretch } = useSettingsContext();
  const [invoice,setInvoice]= useState()

  const {
    query: { id },
  } = useRouter();


  const [currentInvoice, setCurrentInvoice] = useState(null)
  const API_INVO_DETAIL = API_ROOT + `transaction/giaodich/${id}/`


  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(API_INVO_DETAIL);
        setCurrentInvoice(response.data);
        console.log(response.data.id); // logging the invoice id from response data
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, []); 

  return (
    <>
      <Head>
        <title> Giao dịch: Chỉnh sửa | Move-Care</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Quản lý giao dịch"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Giao dịch',
              href: PATH_DASHBOARD.invoice.list,
            },
            { name: `GD-${id}` },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </>
  );
}
