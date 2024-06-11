import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import Iconify from '../../../../components/iconify';
import InvoiceAddressListDialog from './InvoiceAddressListDialog';

import axios from 'axios';
import { API_ROOT } from 'src/config-global';
const API_GET_KHS = API_ROOT + 'auth/khachhang/getlist/';

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress({ invoice }) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { invoiceFrom, invoiceTo } = values;
  const [fromPerson, setFromPerson] = useState([]);
  const [toPerson, setToPerson] = useState([]);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  useEffect(() => {
    const fetchInvoiceFrom = async () => {
      try {
        const response = await axios.get(API_GET_KHS);
        const customers = response.data.data;
        setFromPerson(customers);

        // Set the default value to the customer matching invoice?.khach_hang_thue.idkh
        const defaultCustomer = customers.find(customer => customer.idkh === invoice?.khach_hang_thue.idkh);
        setValue('invoiceFrom', defaultCustomer || customers[0]); // Default to the matching customer or the first customer
      } catch (error) {
        console.error('Failed to fetch invoiceFrom data:', error);
      }
    };

    const fetchInvoiceTo = async () => {
      try {
        const response = await axios.get(API_GET_KHS);
        setToPerson(response.data.data);
        setValue('invoiceTo', response.data.data[0]); // Set the first item by default or adjust as needed
      } catch (error) {
        console.error('Failed to fetch invoiceTo data:', error);
      }
    };

    fetchInvoiceFrom();
    fetchInvoiceTo();
  }, [setValue, invoice?.khach_hang_thue.idkh]);

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };

  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

  const handleOpenTo = () => {
    setOpenTo(true);
  };

  const handleCloseTo = () => {
    setOpenTo(false);
  };

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            Khách hàng:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={handleOpenFrom}
          >
            Thay đổi
          </Button>

          <InvoiceAddressListDialog
            open={openFrom}
            onClose={handleCloseFrom}
            selected={(selectedId) => invoice?.khach_hang_thue.idkh === selectedId}
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={fromPerson}
          />
        </Stack>

        {invoiceFrom ? (
          <AddressInfo
            name={invoiceFrom.ho_ten}
            address={invoiceFrom.dia_chi}
            phone={invoiceFrom.phone_number}
          />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {errors.invoiceFrom?.message}
          </Typography>
        )}
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            Người thực hiện:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={invoiceTo ? 'eva:edit-fill' : 'eva:plus-fill'} />}
            onClick={handleOpenTo}
          >
            {invoiceTo ? 'Thay đổi' : 'Thêm mới'}
          </Button>

          <InvoiceAddressListDialog
            open={openTo}
            onClose={handleCloseTo}
            selected={(selectedId) => invoiceTo?.idkh === selectedId}
            onSelect={(address) => setValue('invoiceTo', address)}
            addressOptions={toPerson}
          />
        </Stack>

        {invoiceTo ? (
          <AddressInfo name={invoiceTo.ho_ten} address={invoiceTo.dia_chi} phone={invoiceTo.phone_number} />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {errors.invoiceTo?.message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
};

function AddressInfo({ name, address, phone }) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">Phone: {phone}</Typography>
    </>
  );
}
