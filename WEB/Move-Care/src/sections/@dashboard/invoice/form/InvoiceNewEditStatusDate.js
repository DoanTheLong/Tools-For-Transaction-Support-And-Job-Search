import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem } from '@mui/material';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['chờ duyệt', 'đang tiến hành', 'đã tiến hành', 'thành công'];

export default function InvoiceNewEditStatusDate({ invoice }) {
  const { control, watch, setValue } = useFormContext();
  const values = watch();
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  
  // Khởi tạo state cho các ngày
  const [createDate, setCreateDate] = useState(invoice?.created_at);
  const [dueDate, setDueDate] = useState(invoice?.thoi_gian_lam_viec);

  // Cập nhật state khi invoice thay đổi
  useEffect(() => {
    if (invoice) {
      setCreateDate(invoice.create_at);
      setDueDate(invoice.thoi_gian_lam_viec);
    } 
  }, [invoice]);

  // Đồng bộ state với giá trị trong form
  useEffect(() => {
    setValue('createDate', createDate);
  }, [createDate, setValue]);

  useEffect(() => {
    setValue('dueDate', dueDate);
  }, [dueDate, setValue]);

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFTextField
        disabled
        name="invoiceNumber"
        label="Số hóa đơn"
        value={`INV-${invoice?.id}`} // Sử dụng giá trị từ invoice
      />

      <RHFSelect  
        fullWidth 
        name='status'
        label="Trạng thái" 
        InputLabelProps={{ shrink: true }}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>

      <Controller
        name="createDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Ngày khởi tạo"
            value={createDate}
            onChange={(newValue) => setCreateDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Ngày thực hiện"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />
    </Stack>
  );
}
