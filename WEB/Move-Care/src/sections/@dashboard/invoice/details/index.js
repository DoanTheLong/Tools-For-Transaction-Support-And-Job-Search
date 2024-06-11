import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
//
import InvoiceToolbar from './InvoiceToolbar';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoiceDetails({ invoice }) {
  if (!invoice) {
    return null;
  }

  const {
    items,
    taxes,
    status,
    dueDate,
    discount,
    invoiceTo,
    createDate,
    totalPrice,
    invoiceFrom,
    invoiceNumber,
    subTotalPrice,
  } = invoice;

  return (
    <>
      <InvoiceToolbar invoice={invoice} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image
              disabledEffect
              alt="logo"
              src="/favicon/android-chrome-512x512.png"
              sx={{ maxWidth: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (invoice.trang_thai === 'successful' && 'success') ||
                  (invoice.trang_thai === 'waiting' && 'warning') ||
                  (invoice.trang_thai === 'cancel' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {invoice.trang_thai}
              </Label>

              <Typography variant="h6">{`Mã giao dịch - ${invoice.id}`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Khách hàng
            </Typography>

            {invoice.khach_hang_thue ? (
              <>
                <Typography variant="body2">
                  Mã khách hàng: {invoice.khach_hang_thue.ma_khach_hang}
                </Typography>
                <Typography variant="body2">Tên: {invoice.khach_hang_thue.ho_ten}</Typography>

                <Typography variant="body2">
                  Giới tính: {invoice.khach_hang_thue.gioi_tinh}
                </Typography>

                <Typography variant="body2">
                  Số điện thoại: {invoice.khach_hang_thue?.phone_number}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">Chưa có khách hàng</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Nhân viên thực hiện
            </Typography>

            {invoice.nhan_vien_thuc_hien ? (
              <>
                <Typography variant="body2">{invoice.id}</Typography>

                <Typography variant="body2">{invoice.id}</Typography>

                <Typography variant="body2">Phone: {invoice.id}</Typography>
              </>
            ) : (
              'Chưa có nhân viên thực hiện'
            )}
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Ngày khởi tạo
            </Typography>

            <Typography variant="body2">{fDate(invoice.create_at)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Thời gian làm việc
            </Typography>

            <Typography variant="body2">{fDate(invoice.thoi_gian_lam_viec)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Giá trị giao dịch
            </Typography>

            <Typography variant="body2">{invoice.gia_tri}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Địa chỉ làm việc
            </Typography>

            <Typography variant="body2">{invoice.dia_chi_lam_viec}</Typography>
          </Grid>
        </Grid>
        

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              ></TableHead>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">Ghi chú</Typography>

            <Typography variant="body2">
              Nếu bạn cần chúng tôi thêm VAT hoặc ghi chú bổ sung, hãy cho chúng tôi biết!
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Nếu bạn có câu hỏi?</Typography>

            <Typography variant="body2">movecare@support.com</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
