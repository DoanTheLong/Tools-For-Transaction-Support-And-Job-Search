import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, Stack, Container, Typography, Button, TextField } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import axios from 'axios';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { SkeletonPostDetails } from '../../../../components/skeleton';
// sections
import { BlogPostHero, BlogPostTags } from '../../../../sections/@dashboard/blog';

// config
import { nameApp, API_ROOT, linkIcon } from 'src/config-global';

// ----------------------------------------------------------------------

BlogPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { title },
  } = useRouter();
  const id = title;

  const API_GET_POST_DETAIL = API_ROOT + 'booking/post/detail/' + id + '/';
  const API_DUYET_BAi = API_ROOT + 'booking/post/approve/' + id + '/';
  const API_TU_CHOI = API_ROOT + 'booking/post/refuse/' + id + '/';

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [reason, setReason] = useState(""); // State to manage the reason

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get(API_GET_POST_DETAIL);
      const fetchedPost = response.data.data;
      setPost(fetchedPost);
      setReason(fetchedPost.ly_do || ""); // Initialize reason with fetched post's ly_do
      
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setErrorMsg(error.message);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [getPost, id]);

  const handleDuyet = async () => {
    try {
      const response = await axios.get(API_DUYET_BAi);
      setReason("")
      setPost(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTuChoi = async () => {
    try {
      const response = await axios.post(API_TU_CHOI, { reason });
      setPost(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Blog: | Move-Care</title>
        <link rel="icon" type="image/png" href={linkIcon} />
      </Head>

      <Container maxWidth={themeStretch ? false : 'md'}>
        <CustomBreadcrumbs
          heading="Chi tiết bài thuê"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Bài thuê',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: post?.tieu_de,
            },
          ]}
        />

        {post && (
          <Stack
            sx={{
              borderRadius: 2,
              boxShadow: (theme) => ({
                md: theme.customShadows.card,
              }),
              p: { xs: 2, md: 5 },
              mx: 'auto',
              maxWidth: 800, // Adjust the max width to control the size of the content
            }}
          >
            <BlogPostHero post={post} />
            
            <Typography
              variant="h6"
              sx={{
                py: 2,
                fontWeight: 'bold',
              }}
            >
              Tiêu đề: {post.tieu_de}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                pb: 2,
              }}
            >
              <strong>Mô tả ngắn:</strong> {post.mo_ta_ngan}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                pb: 2,
              }}
            >
              <strong>Mô tả chi tiết:</strong> {post.chi_tiet}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                pb: 2,
              }}
            >
              <strong>Giá mong muốn:</strong> {parseInt(post.gia).toLocaleString("vi-VN")} đồng
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                pb: 2,
              }}
            >
              <strong>Địa chỉ làm việc:</strong> {post.dia_chi}
            </Typography>
            
            <Markdown
              children={post.body}
            />
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{
                py: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Trạng thái:</Typography>
              <Typography
                variant="body1"
                sx={{
                  color:   post.da_duyet === 0 ? 'orange' : post.da_duyet === 1 ? '#4CAF50' :'#f44336',

                }}
              >
                {post.da_duyet === 0 ? "Đang chờ kiểm duyệt" : post.da_duyet === 1 ? "Đã được duyệt" : "Từ chối"}

              </Typography>
            </Stack>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <Stack
              sx={{
                py: 2,
              }}
            >
              <TextField
                label="Lý do từ chối"
                variant="outlined"
                fullWidth
                value={reason} // Use reason state
                onChange={(e) => setReason(e.target.value)}
                multiline
                rows={4}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ py: 2 }}
            >
              <Button onClick={handleDuyet} variant="contained" color="primary" size="small">
                Duyệt bài
              </Button>
              <Button onClick={handleTuChoi} variant="contained" color="error" size="small">
                Từ chối
              </Button>
            </Stack>
          </Stack>
        )}

        {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

        {loadingPost && <SkeletonPostDetails />}
      </Container>
    </>
  );
}
